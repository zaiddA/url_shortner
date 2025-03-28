from django.core.management.base import BaseCommand
from django.utils import timezone
from linkshortener.models import MyLink

class Command(BaseCommand):
    help = 'Deactivates all expired links'

    def handle(self, *args, **options):
        expired_links = MyLink.objects.filter(
            expires_at__lt=timezone.now(),
            expires_at__isnull=False,
            is_active=True
        )
        
        count = expired_links.count()
        expired_links.update(is_active=False)
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully deactivated {count} expired links')
        ) 