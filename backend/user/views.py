from django.contrib.auth import authenticate, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
# from tokenconfig.models import BlacklistedToken

### register view ###

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


### logout view ###

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def logout(request):
#     refresh_token = request.data.get('refresh_token')
#     if refresh_token:
#         token = RefreshToken(refresh_token)
#         token.blacklist()
#         BlacklistedToken.objects.create(token=str(token))
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
#     return Response(status=status.HTTP_400_BAD_REQUEST)
    