from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import ( 
    RegisterView, 
    ActivateUserView, 
    LoginView, 
    RequestPasswordResetView, 
    PasswordResetConfirmView,
    StartMonitoringView,
    PauseMonitoringView,
    DisconnectMonitoringView,
    PacketListView
)

urlpatterns = [
    # Registration Path 
    path('register/', RegisterView.as_view(), name='register'),
    path('activate/<uid64>/<token>/', ActivateUserView.as_view(), name='activate'),

    # Login Path 
    path('login/', LoginView.as_view(), name='login'),

    # Reset Password Path 
    path('password_reset/', RequestPasswordResetView.as_view(), name='password_reset'),
    path('confirm_password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='confirm_password'),

    # Monitoring buttons control
    path('start/', StartMonitoringView.as_view(), name='start'),
    path('pause/', PauseMonitoringView.as_view(), name='pause'),
    path('disconnect/', DisconnectMonitoringView.as_view(), name='disconnect'),

    # Display packets data
    path('pakets/', PacketListView.as_view(), name='packets')

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)