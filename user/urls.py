from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from . import views

urlpatterns =[
    path('user/create/', views.UserRegisterationView.as_view(), name='register'),
    path('user/login/', TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('blacklist/', views.UserLogoutView.as_view(), name = 'logout')
]
