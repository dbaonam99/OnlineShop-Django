from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

from .serializers import ImageSerializer
from .models import Image



class ImageCreate(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer 