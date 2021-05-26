from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    photo = models.CharField(max_length=256)
    name = models.CharField(max_length=256, blank=True, null=True)
    phone = models.CharField(max_length=256, blank=True, null=True)
    province = models.CharField(max_length=256, blank=True, null=True)
    district = models.CharField(max_length=256, blank=True, null=True)
    email = models.CharField(max_length=256, blank=True, null=True)
    address = models.CharField(max_length=256, blank=True, null=True)
    role = models.CharField(max_length=256)

    @property
    def group(self):
        groups = self.groups.all()
        return groups[0].name if groups else None
