from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    photo = models.CharField(max_length=256)
    name = models.CharField(max_length=256, blank=True)
    phone = models.CharField(max_length=256, blank=True)
    province = models.CharField(max_length=256, blank=True)
    district = models.CharField(max_length=256, blank=True)
    email = models.CharField(max_length=256, blank=True)
    address = models.CharField(max_length=256, blank=True)
    role = models.CharField(max_length=256)

    @property
    def group(self):
        groups = self.groups.all()
        return groups[0].name if groups else None
