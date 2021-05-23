from django.db import models
from django.contrib.auth import get_user_model


class Image(models.Model):  
    url = models.ImageField(upload_to='products/%Y/%m/%d', blank=True)
