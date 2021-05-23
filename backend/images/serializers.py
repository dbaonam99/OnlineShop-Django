from rest_framework import serializers

from .models import Image
import json 


class ImageSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Image
        fields = ('id', 'url') 
    def create(self, validated_data):
        image = validated_data.pop('url') 
        imageResult = Image.objects.create(url=image, **validated_data)
        return imageResult