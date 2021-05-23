from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TestCreate

# Create a router and register our viewsets with it.
router = DefaultRouter()

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('tests/', TestCreate.as_view()),
]