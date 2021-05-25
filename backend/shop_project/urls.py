from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

from users.views import SignUpView, LogInView, ManageUserView


urlpatterns = [
    path('api/', include('products.urls')),
    path('api/', include('orders.urls')),
    path('api/', include('locations.urls')),
    path('api/', include('subscribers.urls')),
    path('api/', include('images.urls')),
    path('api/', include('users.urls')),
    path('admin/', admin.site.urls),
    path('api/sign_up/', SignUpView.as_view(), name='sign_up'),
    path('api/log_in/', LogInView.as_view(), name='log_in'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/me/', ManageUserView.as_view(), name='me'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)