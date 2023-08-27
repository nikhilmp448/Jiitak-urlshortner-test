import random
from django.shortcuts import render
from rest_framework import status
from .models import URLShortener
from string import ascii_lowercase
from rest_framework import viewsets
from django.shortcuts import redirect
from rest_framework.response import Response
from .serializers import URLShortenerSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

def generate_random_slug(length=6):
   """
    Generate a random slug consisting of lowercase letters.

    Args:
        length (int): Length of the slug. Default is 6.

    Returns:
        str: Randomly generated slug.
    """
   return ''.join(random.choice(ascii_lowercase) for _ in range(length))
   

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def url_shortner(request):
   """
    Shorten a URL and create a shortened URL entry in the database.

    Args:
        request (HttpRequest): The HTTP request containing the URL to be shortened.

    Returns:
        Response: HTTP response with data containing the shortened URL and a status code.
    """

   serializer = URLShortenerSerializer(data = request.data)
   if serializer.is_valid():
      url = request.data.get('url')
      slug = generate_random_slug()

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


@api_view(['GET'])
def get_url(request, slug):
   """
    Retrieve the original URL associated with a given slug and redirect to it.

    Args:
        request (HttpRequest): The HTTP request.
        slug (str): The slug used to identify the shortened URL.

    Returns:
        Response: HTTP response that redirects to the original URL if found, or a 404 status code.
    """
   try:
      shortened_url = URLShortener.objects.get(slug=slug)

   except URLShortener.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
   
   return redirect(shortened_url.url)