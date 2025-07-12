from rest_framework import serializers, status
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from .models import User, Server, Packets


User = get_user_model()

# User Authentication

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']
    
    # Validate username, email if already exists

    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"error": "Username already exists!"}, status=status.HTTP_400_BAD_REQUEST)
        return username
    
    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"error": "Email alreay exists!"}, status=status.HTTP_400_BAD_REQUEST)

    def validate_password(self, password):
        if password['password'] != password['confirm_password']:
            raise serializers.ValidationError({"error": "Password do not match!"}, status=status.HTTP_400_BAD_REQUEST)
        return password

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class RequestResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PaswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    confirm_new_password = serializers.CharField(write_only=True)

    def validate(self, new_password):
        if new_password['new_password'] != new_password['confirm_new_password']:
            serializers.ValidationError({"error": "Password do not match!"}, status=status.HTTP_400_BAD_REQUEST)
        validate_password(new_password['new_password'])
        return new_password


# Server Connection
class ServerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Server
        fields = ['host', 'username', 'password']


class PacketsSerializer(serializers.ModelSerializer):
    server = serializers.CharField(read_only=True)
    class Meta:
        model = Packets
        fields = '__all__'