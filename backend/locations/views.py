from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

from .serializers import ProvinceSerializer, DistrictSerializer
from .models import Province, District



class ProvinceCreate(generics.ListCreateAPIView):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer
    # permission_classes = [permissions.IsAuthenticated]

class DistrictCreate(generics.ListCreateAPIView):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer
    # permission_classes = [permissions.IsAuthenticated]