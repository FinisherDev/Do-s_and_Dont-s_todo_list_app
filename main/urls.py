from django.urls import path,include,re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'todo_list', views.TodoGeneralView, 'todo_list')

urlpatterns =[
    path('api/', include(router.urls)),
    path('api/', include('user.urls')),
    path('api/hello/', views.TodoCurrentView.as_view()),
    path('', views.index),
    re_path(r'^.*/$', views.index),
]
