from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from rest_framework.response import Response

from dj_rest_auth.registration.views import SocialLoginView
from .custom_adapter import CustomGoogleOAuth2Adapter

from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.contrib.auth.tokens import default_token_generator
from .serializers import RegistrationSerializer, ResetPasswordRequestSerializer, ConfirmResetPasswordSerializer, LoginSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

# Social app authentication

class GoogleLogin(SocialLoginView):
    adapter_class = CustomGoogleOAuth2Adapter

class UserMe(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


# Email backend authentication

class RegistrationView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            current_site = get_current_site(request)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            activation_link = f"http://127.0.0.1:8000/activate/{uid}/{token}/"
            subject = "Activate your account"
            message = (
                f"Hi {user.username}\n\n"
                f"Click the link below to verify your email and activate your account: \n\n"
                f"{activation_link}\n\n"
                "Thank you!"
            )
            send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email])

            return Response({"message": "Check your email to confirm registration"}, status=status.HTTP_201_CREATED)

        # Print this while testing to see actual error
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivationView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid activation link"}, status=400)
        
        if user and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            user.profile.is_email_verified = True
            user.profile.save()
            return Response({"message": "Email confirmed. You can now login."})
        return Response({"error": "Activation link is invalid!"}, status=400)


class ResetRequestView(APIView):
    def post(self, request):
        serializer = ResetPasswordRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            reset_link = f"http://{get_current_site(request).domain}/reset-password-confirm/{uid}/{token}"
            subject = "Reset Password"
            message = (
                f"Hi {user.username},\n\n"
                f"To reset your password, click the link below:\n\n"
                f"{reset_link}\n\n"
                "If you did not request this, please ignore this email."
            )
            send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email])

            return Response({"message": "Check your email to reset your password"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConfirmResetPasswordView(APIView):
    def post(self, request):
        serializer = ConfirmResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password has been reset successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response({"error": "Invalid username or password!"}, status=status.HTTP_400_BAD_REQUEST)


# class StartCaptureView(APIView):
#     def post(self, request, server_id):
#         server = get_object_or_404(ServerModel, id=server_id)
#         start_capture(server)
#         return Response({'status': 'started'})

# class StopCaptureView(APIView):
#     def post(self, request, server_id):
#         stop_capture(server_id)
#         return Response({'status': 'stopped'})