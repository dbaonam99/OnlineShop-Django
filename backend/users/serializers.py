from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from orders.models import Order


class UserSerializer(serializers.ModelSerializer): 
    orderUser = serializers.PrimaryKeyRelatedField(
        many=True, 
        read_only=True
    ) 

    def create(self, validated_data):
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password',)
        }
        data['password'] = validated_data['password']
        return self.Meta.model.objects.create_user(**data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(validated_data["password"])
                instance.save()
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.province = validated_data.get('province', instance.province)
        instance.district = validated_data.get('district', instance.district)
        instance.address = validated_data.get('address', instance.address)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.save()
        return instance 

    class Meta:
        model = get_user_model()
        fields = (
            'id', 'username','name', 'password', 'email', 'phone',
            'province', 'district', 'orderUser', 'role', 'photo', 'address'
        )
        read_only_fields = ('id',)


class LogInSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_data = UserSerializer(user).data
        for key, value in user_data.items():
            if key != 'id':
                token[key] = value
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['role'] = self.user.role
        return data

class UserManagerSerializer(serializers.ModelSerializer):
    orderUser = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )
    class Meta:
        model = get_user_model()
        fields = (
            'id', 'username', 'password', 'email', 'name', 'phone',
            'province', 'district', 'orderUser', 'district', 'role', 'photo', 'address',
        )