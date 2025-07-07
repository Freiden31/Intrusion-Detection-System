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
                activation_link = f"http://localhost:3000/api/activate/{uid}/{token}/" # must check for url match

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

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        try:
            if serializer.is_valid():
                user = authenticate(
                    username=serializer.validated_data['username'],
                    password=serializer.validated_data['password']
                )
                if user:
                    if not user.is_active:
                        return Response({"error": "Account not activated!"}, status=status.HTTP_403_FORBIDDEN)
                    return Response({"message": "Login successfully!"})
                return Response({"error": "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An error occured!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RequestPasswordResetView(APIView):
    def post(self, request):
        serializer = RequestResetSerializer(data=request.data)

        try:
            if serializer.is_valid():
                email = serializer.validated_data['email']

                try:
                    user = User.objects.get(email=email)
                except User.DoesNotExist:
                    return Response({"error": "Email does not exist!"}, status=status.HTTP_400_BAD_REQUEST)
                
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"http://localhost:3000/api/account/reset-password/{uid}/{token}"  # Must check sooner

            messages = f"Hi {user.username}, \n\n Click the link below to reset your password: \n{reset_link}\n\nThank you!"
            
            try:
                send_mail("Password Reset", messages, None, [user.email])
                return Response({"message": "Reset password link was sent!"}, status=status.HTTP_200_OK)
            except:
                return Response({"error": "Internal Error!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except (ValueError, User.DoesNotExist, TypeError):
            return Response({"error": "Internale Error!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        
        try:
            uid = urlsafe_base64_decode(force_str(uidb64))
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            return Response({"error": "Invalid Link!"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = PaswordResetConfirmSerializer(data=request.data)
        
        try:
            if serializer.is_valid():
                user.set_password(serializer.validated_data["new_password"])
                user.save()
                return Response({"message": "New password crated successfully!"}, status=status.HTTP_201_CREATED)
        except:
            return Response({"error": "Internal Error!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
