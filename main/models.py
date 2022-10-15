from django.db import models
from django.conf import settings

# Create your models here.

class TodoList(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE , related_name='user_id')
    title = models.CharField(max_length = 100)
    description = models.TextField(default = '')
    completed = models.BooleanField(default = False,)
    date_added = models.DateField(auto_now_add = True)
    timestamp = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title
