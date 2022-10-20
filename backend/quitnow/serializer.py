from rest_framework import serializers
from . models import *
  
class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['email', 'name', 'number', 'password']


class QuitPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuitPlan
        fields = ['userid', 'addiction_type', 'how_often', 'start_day', 'buddy', 'amt_spent_weekly', 'reason_to_quit', 'priority', 'commit_duration',
                  'streak', 'amt_saved', 'days_succeed']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = ['userid', 'date_posted', 'post']
