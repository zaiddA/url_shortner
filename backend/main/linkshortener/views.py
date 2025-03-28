from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, redirect
from django.http import HttpResponse
from django.utils import timezone
from django.db.models import Q

from .models import MyLink, LinkAnalytics
from .serializers import LinkSerializer

def home(request):
    return HttpResponse("""
        <h1>Welcome to URL Shortener API</h1>
        <p>Available endpoints:</p>
        <ul>
            <li><a href="/admin/">Admin Panel</a></li>
            <li><a href="/api/link/">Link API</a></li>
            <li><a href="/api/user/">User API</a></li>
        </ul>
    """)

@api_view(['GET'])
def link_api_root(request):
    return Response({
        "message": "Welcome to the Link API",
        "available_endpoints": {
            "create_link": {
                "url": "/api/link/shortener/",
                "method": "POST",
                "description": "Create a new shortened link"
            },
            "get_link": {
                "url": "/api/link/get-link/<hash>/",
                "method": "GET",
                "description": "Get details of a specific link"
            },
            "get_links": {
                "url": "/api/link/get-links/",
                "method": "GET",
                "description": "Get all links for authenticated user"
            },
            "delete_link": {
                "url": "/api/link/delete-link/<hash>/",
                "method": "DELETE",
                "description": "Delete a specific link"
            }
        }
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def create_link(request):
    # Get expiration date from request
    expiration_date = request.data.get('expiration_date')
    
    # Create serializer data with expiration
    data = {
        'source_link': request.data.get('source_link'),
        'expires_at': expiration_date
    }
    
    serializer = LinkSerializer(data=data)
    if serializer.is_valid():
        if request.user.is_anonymous:
            link = serializer.save()
        else:
            link = serializer.save(user=request.user)
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_link(request, hash):
    link = get_object_or_404(MyLink, hash=hash)
    
    # Check if link is expired
    if link.is_expired:
        link.deactivate()
        return Response({"error": "Link has expired"}, status=410)
    
    # Record analytics only once per request
    if not getattr(request, '_analytics_recorded', False):
        LinkAnalytics.objects.create(
            link=link,
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT')
        )
        link.increment_click_count()
        request._analytics_recorded = True
    
    # Return the source URL
    return Response({
        "source_url": link.source_link,
        "hash": link.hash,
        "is_expired": link.is_expired,
        "expires_at": link.expires_at
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_links(request):
    # Get all links for the user, including expired ones
    links = MyLink.objects.filter(
        user=request.user,
        is_active=True
    ).order_by('-created_at')  # Most recent first
    
    serializer = LinkSerializer(links, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_link(request, hash):
    link = get_object_or_404(MyLink, hash=hash, user=request.user)
    link.deactivate()
    return Response({"message": "Link deleted successfully"})