from django.contrib import admin
from .models import SocialMediaPost

@admin.register(SocialMediaPost)
class SocialMediaPostAdmin(admin.ModelAdmin):
    list_display = ('user', 'platform', 'title', 'created_at')
    search_fields = ('user__username', 'platform', 'title')