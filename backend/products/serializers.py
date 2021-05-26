from rest_framework import serializers

from .models import Product, Category, ProductSize, ProductVote, Collection
import json


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = '__all__' 

class ProductSerializer(serializers.ModelSerializer): 
    size_names = serializers.SerializerMethodField(method_name='getSizes')
    votes = serializers.SerializerMethodField(method_name='getVotes')
    category_name = serializers.SerializerMethodField(method_name='getCategories')
    category = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Category.objects.all()
    )
    class Meta:
        model = Product
        fields = (
            'id', 'name','category', 'category_name', 'photo', 'description', 'sold',
            'price', 'sale', 'finalPrice','sex', 'size', 'size_names', 'votes', 'created'
        )

    def getCategories(self, obj):
        category_name = obj.category.name
        if category_name:
            return category_name

    def getVotes(self, obj):
        votes = ProductVote.objects.filter(product=obj.id)
        votesArray = []
        for vote in votes:
            votesArray.append({
                "id": vote.id,
                "name": vote.name,
                "comment": vote.comment,
                "star": vote.star,
                "created": vote.created
            }) 
        return votesArray

    def getSizes(self, obj):
        size_names = obj.size.all()
        return [size_name.name for size_name in size_names]


class ProductVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVote
        fields = ('name', 'comment', 'star', 'product', 'created')
        read_only_fields = ('id', 'created')


class CollectionSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Collection
        fields = (
            'id', 'name', 'banner', 'products', 'created'
        )
        read_only_fields = ('id', 'created',) 