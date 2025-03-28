from django.db import models
from django.contrib.auth.models import User
from . import utils

class LinkAnalytics(models.Model):
    link = models.ForeignKey('MyLink', on_delete=models.CASCADE, related_name='analytics')
    ip_address = models.GenericIPAddressField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user_agent = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.link.hash} - {self.timestamp}"

class MyLink(models.Model):
    source_link = models.CharField(max_length=300)
    hash = models.CharField(max_length=50, default=utils.generate_unique_hash, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    click_count = models.IntegerField(default=0)

    def __str__(self):
        return self.hash

    def increment_click_count(self):
        self.click_count += 1
        self.save()

    @property
    def is_expired(self):
        if self.expires_at is None:
            return False
        from django.utils import timezone
        return timezone.now() > self.expires_at

    def deactivate(self):
        self.is_active = False
        self.save()
