from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    first_name = models.CharField(max_length=100)
    second_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone = models.CharField(max_length=100, unique=True)
    date_of_birth = models.DateField()
    biography = models.TextField(max_length=5000)

    username = models.CharField(max_length=150, unique=True, default='default_username')

    groups = models.ManyToManyField(Group, related_name='messenger_user_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='messenger_user_permissions')

    def __str__(self):
        return self.first_name

    @property
    def available_chats(self):
        return self.chats.all()

class Chat(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    users = models.ManyToManyField('User', related_name='chats')
    is_private = models.BooleanField(default=True)
    attachment = models.FileField(upload_to='chat_attachments/', blank=True, null=True)

    def __str__(self):
        return self.name or "Chat"

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    text = models.TextField(max_length=5000, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    replies = models.ManyToManyField('self', blank=True, symmetrical=False)
    is_reply = models.BooleanField(default=False)
    attachment = models.FileField(upload_to='attachments/', blank=True, null=True)
    caption = models.TextField(max_length=5000, blank=True, null=True)

    def __str__(self):
        return self.text or "Attachment"
