# Generated by Django 2.1.15 on 2020-02-28 08:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ingredient',
            name='description',
        ),
    ]
