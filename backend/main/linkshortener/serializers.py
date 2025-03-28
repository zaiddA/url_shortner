from rest_framework.serializers import ModelSerializer
from .models import MyLink, LinkAnalytics
from rest_framework import serializers

class LinkAnalyticsSerializer(ModelSerializer):
    class Meta:
        model = LinkAnalytics
        fields = ['ip_address', 'timestamp', 'user_agent']

class LinkSerializer(ModelSerializer):
    analytics = LinkAnalyticsSerializer(many=True, read_only=True)
    is_expired = serializers.SerializerMethodField()

    class Meta:
        model = MyLink
        fields = ['id', 'source_link', 'hash', 'user', 'created_at', 'expires_at', 
                 'is_active', 'click_count', 'analytics', 'is_expired']
        read_only_fields = ['hash', 'created_at', 'click_count', 'analytics']

    def get_is_expired(self, obj):
        return obj.is_expired