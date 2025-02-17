from django.db import models
from django.contrib.auth.models import User
import requests
from bs4 import BeautifulSoup

class SocialMediaPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    platform_url = models.URLField(default='https://example.com')
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    preview_image = models.URLField(blank=True)
    social_created_at = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.title or not self.description or not self.preview_image or not self.social_created_at:
            self.fetch_post_details()
        super().save(*args, **kwargs)

    def fetch_post_details(self):
        response = requests.get(self.platform_url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Fetch title
        title_tag = soup.find('meta', property='og:title')
        if title_tag:
            self.title = title_tag['content']

        # Fetch description
        description_tag = soup.find('meta', property='og:description')
        if description_tag:
            self.description = description_tag['content']

        # Fetch preview image
        image_tag = soup.find('meta', property='og:image')
        if image_tag:
            self.preview_image = image_tag['content']

        # Fetch creation date
        date_tag = soup.find('meta', property='article:published_time')
        if date_tag:
            self.social_created_at = date_tag['content']

    def __str__(self):
        return f'{self.user.username} - {self.platform}'