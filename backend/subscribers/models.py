from django.db import models
from django.contrib.auth import get_user_model


class Subscriber(models.Model): 
    email = models.CharField(max_length=256) 
