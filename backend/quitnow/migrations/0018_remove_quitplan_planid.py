# Generated by Django 4.1.1 on 2022-10-19 09:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quitnow', '0017_remove_calendar_color_remove_calendar_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quitplan',
            name='planid',
        ),
    ]
