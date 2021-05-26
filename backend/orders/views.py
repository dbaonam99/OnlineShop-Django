from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import Order, OrderProduct
from .serializers import OrderSerializers, OrderProductSerializers


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializers 

class OrderProductViewSet(viewsets.ModelViewSet):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializers 