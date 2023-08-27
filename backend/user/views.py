from django.contrib.auth import authenticate, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.core.cache import cache
from django.http import JsonResponse
from .models import Account


@api_view(['POST'])
def register(request):
    """
    Register a new user.
    """
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']

        # Check if user with the same username already exists
        if Account.objects.filter(email=email).exists():
            return Response({"error": "User with this Email already exists."}, status=status.HTTP_409_CONFLICT)

        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def logout(request):
    """
    Logout a user by blacklisting the refresh token.
    """
    try:
        refresh_token = request.data["refresh_token"]
        if not refresh_token:
            return Response({"error": "Refresh token not provided"}, status=status.HTTP_400_BAD_REQUEST)
            
        refresh_token_obj = RefreshToken(refresh_token)
        refresh_token_obj.blacklist()
        return Response({"message": "Logout successful"}, status=200)
    except Exception as e:
        return Response({"error": "Logout failed"}, status=400)
    