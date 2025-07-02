# import io, time, paramiko, statistics, joblib, numpy as np, os
# from threading import Thread
# from django.conf import settings
# from .models import PacketModel
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync

# model = joblib.load(os.path.join(settings.BASE_DIR, 'ml_model', 'rf_model_selected.joblib'))
# selector = joblib.load(os.path.join(settings.BASE_DIR, 'ml_model', 'rf_feature_selector.joblib'))
# threads = {}

# def live_capture(server):
#     ssh = paramiko.SSHClient()
#     ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

#     if server.ssh_key:
#         pkey = paramiko.RSAKey.from_private_key(io.StringIO(server.ssh_key))
#         ssh.connect(server.hostname, username=server.ussername, pkey=pkey)
#     else:
#         ssh.connect(server.hostname, username=server.username, password=server.password)
    
#     while threads.get(server.id):
#         server_ip = ssh.exec_command("hostname -I")[1].read().decode().split()[0]
#         cmd = (
#             "sudo tshark -i any -Y 'tcp' -a duration: 2"
#             "-T fields -e ip.src -e ip.dst -e frame.len -e frame.time_relative"
#             "-e tcp.window_size_value -E separator=, -E quote=n -E header=n"
#         )
#         lines = ssh.exec_command(cmd)[1].read().splitlines()

#         fwd, bwd, times, fwd_wins, bwd_wins = [], [], [], [], []
#         dst = None

#         for raw in lines:
#             parts = raw.decode().split(',')
#             if len(parts) < 5:
#                 continue
#             src, dst_, length, rel, win = parts
#             length, rel = int(length), float(rel)
#             win = int(win) if win.isdigit() else 0
#             time.append(rel)
#             if dst_ == server_ip:
#                 fwd.append(length); fwd_wins.append(win)
#             else:
#                 bwd.append(length); bwd_wins.append(win)
        
#         all_len = fwd + bwd
#         iats = [t2 - t1 for t1, t2 in zip(times, times[1:])]
#         mean = lambda arr: sum(arr)/len(arr) if arr else 0
#         std = statistics.stdev(all_len) if len(all_len) > 1 else 0
#         var = statistics.variance(all_len) if len(all_len) > 1 else 0

#         data = {
#             'server': server,
#             'src_ip': server_ip,
#             'dst_ip': dst or server_ip,
#             'flw_duration': int(time.time()),
#             'total_fwd_packets': len(fwd),
#             'total_bwd_packets': len(bwd),
#             'bwd_packets_length_total': sum(bwd),
#             'fwd_packet_length_max': max(fwd) if fwd else 0,
#             'fwd_packet_length_mean': mean(fwd),
#             'bwd_packet_length_max': max(bwd) if bwd else 0,
#             'bwd_packet_length_mean': mean(bwd),
#             'flow_bytes': sum(all_len),
#             'flow_packets': len(all_len),
#             'flow_iat_mean': mean(iats),
#             'flow_iat_std': statistics.stdev(iats) if len(iats)>1 else 0,
#             'flow_iat_max': max(iats) if iats else 0,
#             'fwd_iat_total': sum(iats),
#             'fwd_iat_mean': mean(iats),
#             'fwd_iat_max': max(iats) if iats else 0,
#             'fwd_iat_min': min(iats) if iats else 0,
#             'bwd_iat_total': sum(iats),
#             'bwd_iat_max': max(iats) if len(iats)>0 else 0,
#             'fwd_header_length': mean(fwd_wins) if fwd_wins else 0,
#             'bwd_header_length': mean(bwd_wins) if bwd_wins else 0,
#             'fwd_packets': len(fwd),
#             'bwd_packets': len(bwd),
#             'packet_length_max': max(all_len) if all_len else 0,
#             'packet_length_mean': mean(all_len),
#             'packet_length_std': std,
#             'packet_length_variance': var,
#             'avg_packet_size': mean(all_len),
#             'avg_fwd_segment_size': mean(fwd),
#             'avg_bwd_segment_size': mean(bwd),
#             'subflow_fwd_bytes': sum(fwd),
#             'subflow_bwd_packets': len(bwd),
#             'subflow_bwd_bytes': sum(bwd),
#             'init_fwd_win_bytes': fwd_wins[0] if fwd_wins else 0,
#             'init_bwd_win_bytes': bwd_wins[0] if bwd_wins else 0,
#             'fwd_act_data_packets': len(fwd),
#             'fwd_seg_size_min': min(fwd) if fwd else 0,
#             'active_min': min(iats) if iats else 0
#         }

#         try:
#             vec = np.array([data[f] for f in selector]).reshape(1, -1)
#             raw_label = model.predict(vec)[0]
#             data['label'] = raw_label
#             data['classification'] = "Safe" if str(raw_label).lower() == "benign" else "Anomaly"
#         except Exception:
#             data['label'] = 'Unknown'
#             data['classification'] = 'Error'
            

#         pkt = PacketModel.objects.create(**data)
#         async_to_sync(get_channel_layer().group_send)(
#             f'packets_{server.id}',
#             {'type': 'send_packet', 'data': {
#                 'src_ip': pkt.src_ip,
#                 'dst_ip': pkt.dst_ip,
#                 'label': pkt.label,
#                 'classification': pkt.classification,
#                 'timestamp': pkt.timestamp.isoformat()
#             }}
#         )
#         time.sleep(1)

#     ssh.close()

# def start_capture(server):
#     if server.id not in threads:
#         threads[server.id] = True
#         Thread(target=live_capture, args=(server,), daemon=True).start()

# def stop_capture(server_id):
#     threads.pop(server_id, None)

