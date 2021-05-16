from rest_framework import serializers

from .models import Product, Category, ProductSize, ProductVote, ProductImage
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
    photo = serializers.SerializerMethodField(method_name='getPhotos') 
    category_name = serializers.SerializerMethodField(method_name='getCategories')
    class Meta:
        model = Product
        fields = (
            'id', 'name', 'category_name', 'photo', 'slug', 'description',
            'price', 'sale', 'final_price','sex', 'available', 'size_names', 'votes',
        )
        read_only_fields = ('id', 'created', 'updated', 'photo',)

    def getPhotos(self, obj):
        photos = ProductImage.objects.filter(product=obj.id)
        return [photo.image.url for photo in photos]

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



class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False)
        )
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image']

    def create(self, validated_data):
        images = validated_data.pop('image')
        for image in images:
            image = ProductImage.objects.create(image=image, **validated_data)
        return image