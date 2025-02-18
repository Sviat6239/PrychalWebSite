from django.contrib import admin
from .models import Chat, Message

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_private')
    search_fields = ('name',)
    filter_horizontal = ('users',)
    list_filter = ('is_private',)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'text', 'date')
    search_fields = ('text', 'user__first_name', 'user__email')
    list_filter = ('date', 'user')
