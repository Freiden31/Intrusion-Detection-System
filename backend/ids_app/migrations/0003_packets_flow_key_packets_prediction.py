# Generated by Django 5.1.9 on 2025-07-12 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ids_app', '0002_server_packets'),
    ]

    operations = [
        migrations.AddField(
            model_name='packets',
            name='flow_key',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='packets',
            name='prediction',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
