from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone, dateformat
import datetime
from datetime import date
from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import HStoreField
# Create your models here.


CHAR_LENGTH = 512

d = datetime.timedelta(weeks = 4)

class UserManager(BaseUserManager):
    def create_user(self, email, name, number, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email!')
        user = self.model(email=self.normalize_email(
            email), number=number, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_superuser(self, email, password):
        """Create superuser by email, name, password"""
        user = self.create_user(email=email, password=password, name = 'zijian', number = 107)
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self.db)

        return user


class Users(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'email'
    email = models.EmailField(max_length=CHAR_LENGTH, unique=True)
    name = models.CharField(default="", max_length=200)
    number = models.CharField(max_length=CHAR_LENGTH)
    objects = UserManager()


class QuitPlan(models.Model):
    userid = models.IntegerField()
    addiction_type = models.CharField(max_length=200)
    how_often = models.CharField(max_length=50)
    start_day = models.DateField(default = date.today())
    buddy = models.EmailField()
    amt_spent_weekly = models.FloatField(default=0.0)
    reason_to_quit = models.CharField(max_length=1000)
    priority = models.IntegerField(default=1)
    commit_duration = models.DurationField(default = d)

    streak = models.IntegerField(default=0)
    amt_saved = models.FloatField(default=0.0)
    days_succeed = models.IntegerField(default=0)

    # maybe one field is to store the calendar
    # maybe another field to store all the thoughts?

class Calendar(models.Model):
    userid = models.IntegerField()
    
    datearray = HStoreField(default={"":""})
    # datearray = ArrayField(models.DateField(), default=['2022-08-30'])
    planid = models.IntegerField()


class Forum(models.Model):
    userid = models.IntegerField()
    date_posted = models.DateField(default = date.today())
    post = models.CharField(max_length = 512)



