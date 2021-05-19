from rest_framework import serializers

from .models import Subscriber
import json 


class SubscriberSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Subscriber
        fields = ('id', 'email') 
