# Generated by Django 4.0.4 on 2022-10-05 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_todolist_date_added'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todolist',
            name='description',
            field=models.TextField(default=''),
        ),
    ]
