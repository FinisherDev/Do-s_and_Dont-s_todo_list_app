from django.contrib import admin
from .models import TodoList

# Register your models here.

class TodoAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')

admin.site.register(TodoList, TodoAdmin)
