from django.urls import path
from .views import GoogleLogin,UserMe
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from .views import RegistrationView, ActivationView, ResetRequestView, ConfirmResetPasswordView, LoginView

urlpatterns = [

    # social app authentication

    path('google/login/', GoogleLogin.as_view(), name='google_login'),
    path('users/me/', UserMe.as_view(), name='user_detail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),

    # email backend authentication

    path("register/", RegistrationView.as_view(), name="register"),
    path("activate/<uidb64>/<token>/", ActivationView.as_view(), name="activate_account"),
    path('login/', LoginView.as_view(), name="login"),
    path("password-reset/", ResetRequestView.as_view(), name="password_reset"),
    path("password-reset-confirm/", ConfirmResetPasswordView.as_view(), name="password_reset_confirm")
]