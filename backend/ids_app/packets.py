import threading
import time
import paramiko
import joblib
import pandas as pd
import numpy as np
from .models import Packets

monitoring_active = False
monitor_thread = None
ssh_client = None
ssh_config = {}

selected_features = joblib.load('ml_model/selected_features.pkl')
ml_model = joblib.load('ml_model/model_selected_features.joblib')

def set_ssh_credentials(host, username, password):
    global ssh_config
    ssh_config = {
        'host': host,
        'username': username,
        'password': password
    }

def setup_ssh():
    global ssh_client, ssh_config
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(
        ssh_config['hostname'],
        username=ssh_config['username'],
        password=ssh_config['password']
    )
    return ssh_client

def run_command(ssh, cmd):
    stdin, stdout, _ = ssh.exec_command(cmd)
    return stdout.read().decode()


def parse_flags(flags_str):
    flag_init = int(flags_str, 16) if flags_str else 0
    return {
        'FIN': int(bool(flag_init & 0x1)),
        'SYN': int(bool(flag_init & 0x2)),
        'RST': int(bool(flag_init & 0x3)),
        'PSH': int(bool(flag_init & 0x4)),
        'ACK': int(bool(flag_init & 0x5)),
        'URG': int(bool(flag_init & 0x6)),
        'ECE': int(bool(flag_init & 0x7)),
        'CWR': int(bool(flag_init & 0x8)),
    }

def add_packet_to_flow(flows, pkt):
    key = (pkt['src_ip'], pkt['dst_ip'], pkt['src_port'], pkt['dst_port'], pkt['proto'])
    rev_key = (pkt['dst_ip'], pkt['src_ip'], pkt['dst_port'], pkt['src_port'], pkt['proto'])

    for k in (key, rev_key):
        if k in flows:
            flows[k].append(pkt)
            return k
    flows[key] = [pkt]
    return key

def compute_flow_features(pkts):
    times = np.array([p['time'] for p in pkts])
    lengths = np.array([p['len'] for p in pkts])

    proto = pkts[0]['proto'] if pkts else 0
    flow_duration = times[-1] - times[0] if len(times) > 1 else 0

    fwd_ip = pkts[0]['src_ip']
    bwd_ip =pkts[0]['dst_ip']
    fwd_port = pkts[0]['src_port']
    bwd_port = pkts[0]['dst_port']

    fwd_pkts = [p for p in pkts if p['src_ip'] == fwd_ip and p['src_port'] == fwd_port]
    bwd_pkts = [p for p in pkts if p['src_ip'] == bwd_ip and p['src_port'] == bwd_port]

    def stats(arr):
        if len(arr) == 0:
            return 0, 0, 0
        return np.max(arr), np.mean(arr), np.std(arr)
    
    fwd_lens = np.array([p['len'] for p in fwd_pkts])
    bwd_lens = np.array([p['len'] for p in bwd_pkts])

    fwd_len_max, fwd_len_mean, fwd_len_std = stats(fwd_lens)
    bwd_len_max, bwd_len_mean, bwd_len_std = stats(bwd_lens)

    total_fwd_pkts = len(fwd_pkts)
    total_bwd_pkts = len(bwd_pkts)

    flow_pkts_per_s = len(pkts) / flow_duration if flow_duration > 0 else 0
    flow_bytes_per_s = np.sum(lengths) / flow_duration if flow_duration > 0 else 0

    iats = np.diff(times) if len(times) > 1 else np.array([0])
    flow_iats_mean = np.mean(iats)
    flow_iats_std = np.std(iats)
    flow_iats_max = np.max(iats)
    flow_iats_min = np.min(iats)

    def iats_stats(pkts_list):
        t = np.array([p['time'] for p in pkts_list])

        if len(t) <= 1:
            return 0, 0, 0, 0, 0
        diffs = np.diff(t)
        return np.sum(diffs), np.mean(diffs), np.std(diffs), np.max(diffs), np.min(diffs)
    
    fwd_iat_total, fwd_iat_mean, fwd_iat_std, fwd_iat_max, fwd_iat_min = iats_stats(fwd_pkts)
    bwd_iat_total, _, _, _, _ = iats_stats(bwd_pkts)

    # Calculate the missing features
    bwd_iat_mean = np.mean(np.diff([p['time'] for p in bwd_pkts])) if len(bwd_pkts) > 1 else 0
    psh_flag_count = sum(1 for p in bwd_pkts if p['flags']['PSH'] == 1)
    subflow_bwd_bytes = np.sum(bwd_lens)

    subflow_fwd_bytes = np.sum(fwd_lens)
    subflow_bwd_pkts = total_bwd_pkts

    init_fwd_win_bytes = fwd_pkts[0]['window_size'] if total_fwd_pkts > 0 else 0
    init_bwd_win_bytes = bwd_pkts[0]['window_size'] if total_bwd_pkts > 0 else 0

    fwd_act_data_pkts = sum(1 for p in fwd_pkts if p['tcp_len'] > 0)
    fwd_seg_size_min = np.min([p['tcp_len'] for p in fwd_pkts]) if total_fwd_pkts > 0 else 0
    active_mine = flow_iats_min

    fwd_header_length = 40
    bwd_header_length = 40

    return {
        'flow_drt': flow_duration,
        'ttl_fwd_packets':
        'ttl_bwd_packets':
        'fwd_packets_length_ttl'
    }