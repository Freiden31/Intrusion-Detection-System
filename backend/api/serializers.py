from rest_framework import serializers
from django.contrib.auth.models import User
import os
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status

from .models import ServerModel, PacketModel

class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    bio = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email','image', 'bio']
    
    def get_image(self, user):
        main_url =  os.getenv('MAIN_URL')
        return main_url + user.profile.avatar.url
    
    def get_bio(self, user):
        return user.profile.bio


class JWTSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()


# API serializer for registration

class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_username(self, value):
        value = value.strip()
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists!")
        return value

    def validate_email(self, value):
        value = value.strip().lower()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists!")
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Password does not match!")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        user.is_active = False
        user.save()
        return user

class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email does not exists!")
        return value

class ConfirmResetPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Password do not match!")
        return data

    def save(self):
        uid = urlsafe_base64_decode(force_str(self.validated_data['uid']))
        user = User.objects.get(pk=uid)
        token = self.validated_data['token']

        if not default_token_generator.check_token(user, token):
            raise serializers.ValidationError("Invalid or expired")

        user.set_password(self.validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid Credetials")
        data['user'] = user
        return data


class ServerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServerModel
        fields = ['id', 'user', 'hostname', 'username', 'password', 'ssh_key']
    
class PacketModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PacketModel
        fields = '__all__'
