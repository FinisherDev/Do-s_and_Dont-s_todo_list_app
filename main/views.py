from django.utils.timezone import localdate
from django.shortcuts import render
from .serializers import TodoSerializer
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import ListAPIView
from .models import TodoList

# Create your views here.

#Creates a date object with the current date.
current_date = localdate()

def index(request):
    return render(request, 'index.html')

class TodoGeneralView(viewsets.ModelViewSet):
    """
    Lists all the lists made by this user.
    """

    serializer_class = TodoSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def get_queryset(self):
        todoList = TodoList.objects.order_by('-timestamp')
        return todoList.filter(user = self.request.user)

class TodoCurrentView(ListAPIView):
    """
    Lists Todolists for the day as the Current List.
    """

    serializer_class = TodoSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def get_queryset(self):
        #Returns lists made by the current user for the day.
        todoList = TodoList.objects.order_by('-timestamp')
        return todoList.filter(user = self.request.user).filter(date_added = current_date.isoformat())
