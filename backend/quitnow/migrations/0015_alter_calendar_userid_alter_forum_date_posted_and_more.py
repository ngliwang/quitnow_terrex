# Generated by Django 4.1.1 on 2022-10-18 16:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quitnow', '0014_alter_calendar_datearray'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calendar',
            name='userid',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='forum',
            name='date_posted',
            field=models.DateField(default=datetime.date(2022, 10, 19)),
        ),
        migrations.AlterField(
            model_name='quitplan',
            name='start_day',
            field=models.DateField(default=datetime.date(2022, 10, 19)),
        ),
    ]