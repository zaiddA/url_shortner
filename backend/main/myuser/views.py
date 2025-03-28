from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserRegisterSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def user_api_root(request):
    return Response({
        "message": "Welcome to the User API",
        "available_endpoints": {
            "register": {
                "url": "/api/user/register/",
                "method": "POST",
                "description": "Register a new user"
            },
            "token_obtain": {
                "url": "/api/user/token/",
                "method": "POST",
                "description": "Get JWT access and refresh tokens"
            },
            "token_refresh": {
                "url": "/api/user/token/refresh/",
                "method": "POST",
                "description": "Refresh JWT access token"
            },
            "token_verify": {
                "url": "/api/user/token/verify/",
                "method": "POST",
                "description": "Verify JWT token"
            }
        }
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff,
        'date_joined': user.date_joined
    })
