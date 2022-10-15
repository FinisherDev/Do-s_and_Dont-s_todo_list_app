# Generated by Django 4.0.4 on 2022-09-30 08:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_todolist_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='todolist',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
