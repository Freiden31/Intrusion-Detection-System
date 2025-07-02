# ================================
# models.py
# ================================
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

def profile_path(instance, filename): 
    return f'user_{instance.user.id}/{filename}'

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(default='profile/default.png', upload_to=profile_path)
    bio = models.TextField(blank=True)
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()


# ================================
# backends.py
# ================================
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
from django.db.models import Q

class EmailOrUsernameBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(Q(username__iexact=username) | Q(email__iexact=username))
        except User.DoesNotExist:
            return None
        if user.check_password(password) and user.is_active and user.profile.is_email_verified:
            return user
        return None


# ================================
# views.py
# ================================
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import default_token_generator
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers




# API-BASED REGISTRATION VIEW
class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            current_site = get_current_site(request)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            activation_link = f"http://{current_site.domain}/api/activate/{uid}/{token}/"
            subject = "Activate your account"
            message = (
                f"Hi {user.username},\n\n"
                f"Please click the link below to verify your email and activate your account:\n\n"
                f"{activation_link}\n\n"
                f"Thank you!"
            )

            send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email])

            return Response({"message": "Check your email to confirm registration."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API-BASED ACTIVATION VIEW
class ActivateAPIView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid activation link."}, status=400)

        if user and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            user.profile.is_email_verified = True
            user.profile.save()
            return Response({"message": "Email confirmed. You can now log in."})
        return Response({"error": "Activation link is invalid!"}, status=400)


# ================================
# urls.py
# ================================
from django.urls import path
from . import views

urlpatterns = [
    # Form views
    path("register/", views.register_view, name="register"),  # If defined
    path("activate/<uidb64>/<token>/", views.activate_view, name="activate"),

    # API views
    path("api/register/", views.RegisterAPIView.as_view(), name="api_register"),
    path("api/activate/<uidb64>/<token>/", views.ActivateAPIView.as_view(), name="api_activate"),
]


# ================================
# templates/activation_email.html
# ================================
"""
Hi {{ user.username }},

Please click the link below to verify your email and activate your account:

http://{{ domain }}{% url 'activate' uidb64=uid token=token %}

Thank you!
"""


# ================================
# settings.py (relevant parts)
# ================================
AUTHENTICATION_BACKENDS = [
    'yourapp.backends.EmailOrUsernameBackend',  # Replace 'yourapp' with your actual app name
]

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your@gmail.com'
EMAIL_HOST_PASSWORD = 'your_app_password'
