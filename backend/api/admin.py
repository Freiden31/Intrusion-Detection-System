from django.contrib import admin
from .models import Profile, PacketModel, ServerModel


admin.site.register(Profile)
admin.site.register(PacketModel)
admin.site.register(ServerModel)