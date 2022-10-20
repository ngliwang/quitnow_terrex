# Generated by Django 4.0 on 2022-10-13 08:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quitnow', '0002_users_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userid', models.IntegerField(unique=True)),
                ('date', models.DateField()),
                ('color', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Forum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userid', models.IntegerField(unique=True)),
                ('date_posted', models.DateField(default=datetime.date(2022, 10, 13))),
                ('post', models.CharField(max_length=512)),
            ],
        ),
    ]