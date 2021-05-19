from django.db import models
from django.contrib.auth import get_user_model


class Province(models.Model): 
    name = models.CharField(max_length=256)
    type = models.CharField(max_length=256)
    map_location = models.CharField(max_length=256)

    
class District(models.Model): 
    name = models.CharField(max_length=256)
    map_location = models.CharField(max_length=256)
    type = models.TextField()  
    tinh_id = models.CharField(max_length=256)