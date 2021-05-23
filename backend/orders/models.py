from django.db import models
from django.contrib.auth import get_user_model

from products.models import Product


class Order(models.Model): 
    creator = models.ForeignKey(
        get_user_model(), related_name="orders_creator", null=True,
        blank=True, on_delete=models.SET_NULL
    )
    customer_name = models.CharField(max_length=256)
    customer_email = models.CharField(max_length=256)
    customer_phone = models.CharField(max_length=15)
    customer_province = models.CharField(max_length=256)
    customer_district = models.CharField(max_length=256)
    customer_address = models.CharField(max_length=256)
    total_amount = models.IntegerField()
    payment_method = models.CharField(max_length=256)
    created = models.DateTimeField(auto_now_add=True)


class OrderLine(models.Model):
    order = models.ForeignKey(Order, related_name='lines', on_delete=models.CASCADE)
    product = models.ManyToManyField(Product, related_name='lines')
    quantity = models.IntegerField()