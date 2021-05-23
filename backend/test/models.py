# from django.db import models
from django.db import models
from django.contrib.auth import get_user_model
from mongoengine import Document
from django.contrib.postgres.fields import ArrayField 

class Test(models.Model):   

    photo = ArrayField(models.CharField(max_length=255))
