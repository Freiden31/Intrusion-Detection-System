from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

class Server(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    host = models.GenericIPAddressField()
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

class Packets(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)
    src_ip = models.GenericIPAddressField()
    dst_ip = models.GenericIPAddressField()

    flow_drt = models.FloatField()
    ttl_fwd_packets = models.FloatField()
    ttl_bwd_packets = models.FloatField()
    fwd_packets_length_ttl = models.FloatField()
    bwd_packet_length_ttl = models.FloatField()
    fwd_packets_length_max = models.FloatField()
    fwd_packets_length_mean = models.FloatField()
    fwd_packets_length_std = models.FloatField()
    bwd_packet_length_max = models.FloatField()
    bwd_packet_length_mean = models.FloatField()
    flow_packets = models.FloatField()
    flow_iat_mean = models.FloatField()
    flow_iat_std = models.FloatField()
    flow_iat_max = models.FloatField()
    fwd_iat_total = models.FloatField()
    fwd_iat_mean = models.FloatField()
    fwd_iat_std = models.FloatField()
    fwd_iat_max = models.FloatField()
    fwd_iat_min = models.FloatField()
    bwd_iat_total = models.FloatField()
    bwd_iat_mean = models.FloatField()
    psh_flag_count = models.FloatField()
    subflow_bwd_bytes = models.FloatField()
    fwd_header_length = models.FloatField()
    bwd_header_length = models.FloatField()
    fwd_packets = models.FloatField()
    bwd_packets = models.FloatField()
    packet_length_max = models.FloatField()
    packet_length_mean = models.FloatField()
    packet_legnth_std = models.FloatField()
    packcet_length_vairiance = models.FloatField()
    avg_packet_size = models.FloatField()
    avg_fwd_segment_size = models.FloatField()
    avg_bwd_segment_size = models.FloatField()
    subflow_fwd_bytes = models.FloatField()
    subflow_bwd_packets = models.FloatField()
    init_fwd_win_bytes = models.FloatField()
    init_bwd_win_bytes = models.FloatField()
    fwd_act_data_packets = models.FloatField()
    fwd_seg_size_min = models.FloatField()
    active_min = models.FloatField()

    def __str__(self):
        return str(self.timestamp)



