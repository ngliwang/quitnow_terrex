# Generated by Django 4.0 on 2022-10-08 15:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuitPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userid', models.IntegerField(unique=True)),
                ('planid', models.IntegerField()),
                ('addiction_type', models.CharField(max_length=200)),
                ('how_often', models.CharField(max_length=50)),
                ('start_day', models.DateField()),
                ('buddy', models.EmailField(max_length=254)),
                ('amt_spent_weekly', models.FloatField(default=0.0)),
                ('reason_to_quit', models.CharField(max_length=1000)),
                ('priority', models.IntegerField(default=1)),
                ('commit_duration', models.DurationField(default=datetime.timedelta(days=28))),
                ('streak', models.IntegerField(default=0)),
                ('amt_saved', models.FloatField(default=0.0)),
                ('days_passed', models.IntegerField(default=0)),
                ('days_succeed', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=512, unique=True)),
                ('number', models.CharField(max_length=512)),
                ('tot_plan', models.IntegerField(default=0)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
