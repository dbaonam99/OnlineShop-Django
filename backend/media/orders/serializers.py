from rest_framework import serializers

from .models import Order, OrderLine
from products.models import Product


class OrderSerializers(serializers.ModelSerializer):
    lines = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=OrderLine.objects.all()
    )
    class Meta:
        model = Order
        fields = ('id', 'customer_name', 'customer_email', 'customer_phone', 'customer_province', 'customer_district',
                    'customer_ward', 'customer_address', 'total_amount', 'payment_method', 'created', 'lines')


class OrderLineSerializers(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Product.objects.all()
    )
    class Meta:
        model = OrderLine
        fields = ('id', 'order', 'product', 'quantity')

