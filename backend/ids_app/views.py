from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.template.loader import render_to_string

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer, LoginSerializer, RequestResetSerializer, PaswordResetConfirmSerializer


User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        try:
            if serializer.is_valid():
                data = serializer.validated_data
                user = User.objects.create_user(
                    username=data['username'],
                    email=data['email'],
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                    password=data['password'],
                    is_active=False
                )
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                token = default_token_generator.make_token(user)
                activation_link = f"http://{request.get_host()}/api/activate/{uid}/{token}/" # must check for url match

                message = f"Hi {user.username},\n\nPlease activate your account by clicking the link below:\n{activation_link}\n\nThank you!"
                
                try:
                    send_mail('Activate your account', message, None, [user.email])
                except Exception as e:
                    return Response({"error": "Activation email failed to send"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"message": "Activation email sent. Please check your inbox!"})
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ActivateUserView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError):
            return Response({"error": "Invalid activation link!"}, status=status.HTTP_400_BAD_REQUEST)
        
        if default_token_generator.check_token(user, token):
            user.is_active=True
            user.save()
            return Response({"message": "Account activated successfully!"})
        return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
    