from django.contrib.auth import get_user_model
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, unique=True)
    
    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'
        
    def __str__(self):
        return self.name


class ProductSize(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name 


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, db_index=True)
    sex = models.CharField(max_length=200, db_index=True)
    description = models.TextField(blank=True)
    price = models.IntegerField()
    sale = models.IntegerField()
    available = models.BooleanField(default=True)
    size = models.ManyToManyField(ProductSize, related_name="product_size") 
    photo = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    finalPrice = models.IntegerField()
    sold = models.IntegerField()
    class Meta:
        ordering = ('name',)
        index_together = (('id'),)

    def __str__(self):
        return self.name

    @property
    def finalPrice(self):
        return (self.price - (self.price * self.sale / 100))


class ProductVote(models.Model): 
    name = models.CharField(max_length=256)
    comment = models.TextField() 
    star = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, related_name="votes", on_delete=models.CASCADE)


class Collection(models.Model):
    name = models.CharField(max_length=256)
    banner = models.CharField(max_length=256)
    created = models.DateTimeField(auto_now_add=True)
    products = models.ManyToManyField(Product)