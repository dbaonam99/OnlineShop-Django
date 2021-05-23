from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

from .serializers import TestSerializer
from .models import Test



class TestCreate(generics.ListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer 