from rest_framework import serializers
from .models import Test
import json 


class TestSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Test
        fields = ('id', 'photo') 
