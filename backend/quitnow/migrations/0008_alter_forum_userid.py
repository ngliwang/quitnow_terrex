# Generated by Django 4.0 on 2022-10-17 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quitnow', '0007_remove_users_tot_plan'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forum',
            name='userid',
            field=models.IntegerField(),
        ),
    ]
