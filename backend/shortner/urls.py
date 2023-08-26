from django.urls import path
from .views import *

urlpatterns = [
    path('shortened-urls/', url_shortner , name="url_shortner"),
    path('<str:slug>/', get_url , name="get_url")
]