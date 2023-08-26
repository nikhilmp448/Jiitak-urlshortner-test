from django.urls import path
from user.views import *

urlpatterns = [
    path('register/', register, name='register'),
    path('logout/', logout, name='logout'),
]