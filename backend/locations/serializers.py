from rest_framework import serializers

from .models import Province, District
import json 


class ProvinceSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Province
        fields = ('id', 'name', 'type', 'map_location') 


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ('id', 'name', 'map_location', 'tinh_id', 'type') 
