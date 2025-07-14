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
    active_min = flow_iats_min

    fwd_header_length = 40
    bwd_header_length = 40

    return {
        'flow_drt' : flow_duration,
        'ttl_fwd_packets' : total_fwd_pkts,
        'ttl_bwd_packets' : total_bwd_pkts,
        'fwd_packets_length_ttl' : np.sum(fwd_lens),
        'bwd_packet_length_ttl' : np.sum(bwd_lens),
        'fwd_packets_length_max' : fwd_len_max, 
        'fwd_packets_length_mean' : fwd_len_mean, 
        'fwd_packets_length_std': fwd_len_std,
        'bwd_packet_length_max': bwd_len_max,
        'bwd_packet_length_mean': bwd_len_mean,
        'flow_packets': flow_bytes_per_s,
        'flow_iat_mean': flow_iats_mean,
        'flow_iat_std': flow_iats_std,
        'flow_iat_max': flow_iats_max,
        'fwd_iat_total': fwd_iat_total,
        'fwd_iat_mean': fwd_iat_mean,
        'fwd_iat_std': fwd_iat_std,
        'fwd_iat_max': fwd_iat_max,
        'fwd_iat_min': fwd_iat_min,
        'bwd_iat_total': bwd_iat_total,
        'bwd_iat_mean': bwd_iat_mean,
        'psh_flag_count': psh_flag_count,
        'subflow_bwd_bytes': subflow_bwd_bytes,
        'fwd_header_length': fwd_header_length,
        'bwd_header_length': bwd_header_length,
        'fwd_packets': total_fwd_pkts / flow_duration if flow_duration > 0 else 0,
        'bwd_packets': total_bwd_pkts / flow_duration if flow_duration > 0 else 0,
        'packet_length_max': np.max(lengths),
        'packet_length_mean': np.mean(lengths),
        'packet_legnth_std': np.std(lengths),
        'packcet_length_vairiance': np.var(lengths),
        'avg_packet_size': np.mean(lengths),
        'total_bytes': np.sum(lengths),
        'total_mb': round(np.sum(lengths) / (1024, 1024), 4),
        'avg_fwd_segment_size': fwd_len_mean,
        'avg_bwd_segment_size': bwd_len_mean,
        'subflow_fwd_bytes': subflow_fwd_bytes,
        'subflow_bwd_packets': subflow_bwd_pkts,
        'init_fwd_win_bytes': init_fwd_win_bytes,
        'init_bwd_win_bytes': init_bwd_win_bytes,
        'fwd_act_data_packets': fwd_act_data_pkts,
        'fwd_seg_size_min': fwd_seg_size_min,
        'active_min': active_min,
    }

def capture_packets(ssh):
    tshark_cmd = (
        "sudo tshark -i eth0 -a duraction -q -T fields"
        "-e frame.time_relative -e ip.src -e ip.dst -e tcp.srcport -e dst.port"
        "-e ip.proto -e frame.len -e tcp.flags -e tcp.window_size -e tcp.len"
        "e ip.ttl -e tcp.analysis.retransmission"
        "-E separator=, -E aggregator=none"
    )

    raw = run_command(ssh, tshark_cmd)
    packets = []
    for line in raw.splitlines():
        parts = line.strip().split(',')
        if len(parts) < 8:
            continue
        try:
            pkt = {
                'time': float(parts[0]),
                'src_ip': parts[1],
                'dst_ip': parts[2],
                'src_port': int(parts[3]) if parts[3] else 0,
                'dst_port': int(parts[4]) if parts[4] else 0,
                'proto': int(parts[5]) if parts[5] else 0,
                'len': float(parts[6]) if parts[6] else 0,
                'flags': parse_flags(parts[7] if parts[7] else '0x0'),
                'window_size': int(parts[8]) if len(parts) > 8 and parts[8] else 0,
                'tcp_len': float(parts[9]) if len(parts) > 9 and parts[9] else 0,
                'ip_ttl': int(parts[10]) if len(parts) > 10 and parts[10] else 0,
                'tcp_retrans': int(parts[11]) if len(parts) > 11 and parts[11] == '1' else 0
            }
            packets.append(pkt)
        except Exception:
                continue
    return packets


def monitoring_loop():
    global monitoring_active
    while monitoring_active:
        packets = capture_packets()
        flows = {}
        for pkt in packets:
            add_packet_to_flow(flows, pkt)
        for flow_key, pkts in flows.items():
            features = compute_flow_features(pkts)
            try:
                input_df = pd.DataFrame([features])[selected_features]
                prediction = ml_model.predict(input)[0]
            except Exception:
                prediction = "Unknown" # Error
            
            Packets.objects.create(
                flow_key=str(flow_key),
                prediction=prediction,
                **features
            )
        time.sleep(1)

def start_monitoring():
    global monitoring_active, monitor_thread
    setup_ssh()
    monitoring_active = True
    monitor_thread = threading.Thread(target=monitoring_loop)
    monitor_thread.start()

def pause_monitoring():
    global monitoring_active
    monitoring_active = False

def disconnect_ssh():
    global monitoring_active, ssh_client
    monitoring_active = False
    if ssh_client:
        ssh_client.close()
        ssh_client = None
