from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

def profile_path(instance, filename): 
    return 'user_{0}/{1}'.format(instance.user.id, filename)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    avatar = models.ImageField( 
        default='profile/default.png', 
        upload_to = profile_path
    )
    bio = models.TextField()
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)


class ServerModel(models.Model):
    user = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='server')
    hostname = models.GenericIPAddressField()
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

class PacketModel(models.Model):
    server = models.ForeignKey(ServerModel, on_delete=models.CASCADE, related_name='packets')
    timestamp = models.DateTimeField(auto_now_add=True)

    src_ip = models.GenericIPAddressField()
    dst_ip = models.GenericIPAddressField()

    prediction = models.CharField(max_length=50)

    flw_duration = models.FloatField()
    total_fwd_packets = models.FloatField()
    total_bwd_packets = models.FloatField()
    fwd_packets_lenght_total = models.FloatField()
    bwd_packets_lenght_total = models.FloatField()
    fwd_packet_length_max = models.FloatField()
    fwd_packet_length_mean = models.FloatField()
    fwd_packet_length_std = models.FloatField()
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
    fwd_header_length = models.FloatField()
    bwd_header_length = models.FloatField()
    fwd_packets = models.FloatField()
    bwd_packets = models.FloatField()
    packet_length_max = models.FloatField()
    packet_length_mean = models.FloatField()
    packet_length_std = models.FloatField()
    packet_length_variance = models.FloatField()
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

    class Meta:
        ordering = ['-timestamp']
