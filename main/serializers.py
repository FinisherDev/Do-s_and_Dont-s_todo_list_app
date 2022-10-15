from rest_framework import serializers
from .models import TodoList

class TodoSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only = True, default = serializers.CurrentUserDefault())
    class Meta:
        model = TodoList
        fields = '__all__'
