from rest_framework import serializers

from .models import Order, OrderProduct
from products.models import Product


class OrderProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ('id', 'product', 'quantity')

class OrderSerializers(serializers.ModelSerializer):
    orderProduct = OrderProductSerializers(many=True)
    class Meta:
        model = Order
        fields = ('id', 'userName', 'userEmail', 'userPhone', 'userProvince', 'userDistrict', 'orderProduct',
                'userAddress', 'totalAmount', 'paymentMethod', 'created', 'creator')

    def create(self, validated_data):
        orderProducts = validated_data.pop('orderProduct')
        order =  Order.objects.create(**validated_data)
        for line_data in orderProducts:
            product_obj = line_data.get("product")
            if product_obj:
                product_obj.sold += line_data.get("quantity")
                product_obj.save()
            OrderProduct.objects.create(order=order, **line_data)
        return order
        