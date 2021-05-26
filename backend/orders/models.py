from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product

class Order(models.Model):
    creator = models.ForeignKey(
        get_user_model(), related_name="orderUser", null=True,
        blank=True, on_delete=models.SET_NULL
    )
    userName = models.CharField(max_length=256)
    userEmail = models.CharField(max_length=256)
    userPhone = models.CharField(max_length=15)
    userProvince = models.CharField(max_length=256)
    userDistrict = models.CharField(max_length=256)
    userAddress = models.CharField(max_length=256)
    totalAmount = models.FloatField()
    paymentMethod = models.CharField(max_length=256)
    created = models.DateTimeField(auto_now_add=True)


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, related_name='orderProduct', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='orderProduct', on_delete=models.CASCADE)
    quantity = models.IntegerField()