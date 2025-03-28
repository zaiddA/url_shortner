from django.contrib import admin
from django.urls import path, include
from linkshortener.views import home

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/link/', include('linkshortener.urls')),
    path('api/user/', include('myuser.urls'))
]
