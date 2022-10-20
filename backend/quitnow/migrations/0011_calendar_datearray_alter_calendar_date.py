# Generated by Django 4.1.1 on 2022-10-18 14:53

import django.contrib.postgres.fields
from django.db import migrations, models
from django.contrib.postgres.operations import HStoreExtension

class Migration(migrations.Migration):

    dependencies = [
        ('quitnow', '0010_alter_calendar_date'),
    ]

    operations = [
        HStoreExtension(),
        migrations.AddField(
            model_name='calendar',
            name='datearray',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.DateField(), default=['2022-08-30'], size=None),
        ),
    ]