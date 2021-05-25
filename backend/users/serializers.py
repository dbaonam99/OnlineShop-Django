from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password')
        }
        data['password'] = validated_data['password']
        return self.Meta.model.objects.create_user(**data)

    class Meta:
        model = get_user_model()
        fields = (
            'id', 'username', 'password',
            'first_name', 'last_name',
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
        token['name'] = "1123123"
        return token

class UserManagerSerializer(serializers.ModelSerializer):
    orders_creator = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )
    class Meta:
        model = get_user_model()
        fields = ('id', 'username',
            'first_name', 'last_name','orders_creator')