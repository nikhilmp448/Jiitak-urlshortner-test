from django.shortcuts import render
from rest_framework import viewsets
from .models import URLShortener
import random
from django.shortcuts import redirect
from string import ascii_lowercase
from rest_framework.response import Response
from rest_framework import status
from .serializers import URLShortenerSerializer
from rest_framework.decorators import api_view, permission_classes

### to short the given urls ###

@api_view(['POST'])
def url_shortner(request):
   serializer = URLShortenerSerializer(data = request.data)
   if serializer.is_valid():
      url = request.data.get('url')
      slug = ''.join(random.choice(ascii_lowercase) for _ in range(6))

      shortened_url = URLShortener.objects.create(
            url=url,
            slug=slug
        )

      data=URLShortenerSerializer(shortened_url).data
      context = {'shorten_url': "http://localhost:8000/stickylink/"+slug}

      print(data)

      return Response(
         {**data,**context},
         status=status.HTTP_201_CREATED,
      )
   return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

### to get the shorten url and redirect to original ###

@api_view(['GET'])
def get_url(request, slug):
   shortened_url = URLShortener.objects.filter(slug=slug).first()

   if shortened_url is None:
      return Response(status=status.HTTP_404_NOT_FOUND)
   
   return redirect(shortened_url.url)