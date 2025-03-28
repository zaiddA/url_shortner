from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path('', views.link_api_root, name="link-api-root"),
    path('shortener/', views.create_link, name="shortener"),
    path('get-link/<str:hash>/', views.get_link, name="get-link"),
    path('get-links/', views.get_links, name="get-links"),
    path('delete-link/<str:hash>/', views.delete_link, name="delete-link"),
]