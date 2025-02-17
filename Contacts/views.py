from django.shortcuts import render, redirect, get_object_or_404
from .models import SocialMediaPost
import requests
from bs4 import BeautifulSoup

def index(request):
    return render(request, 'index.html')

def contacts(request):
    return render(request, 'contacts.html')

def about(request):
    return render(request, 'about.html')

def socialmedia(request):
    platform = request.GET.get('platform', 'All')
    if platform == 'All':
        posts = SocialMediaPost.objects.order_by('-social_created_at')[:6]
    else:
        posts = SocialMediaPost.objects.filter(platform=platform).order_by('-social_created_at')[:6]

    for post in posts:
        if not post.title or not post.description or not post.preview_image or not post.social_created_at:
            details = fetch_post_details(post.platform_url)
            post.title = details['title']
            post.description = details['description']
            post.preview_image = details['preview_image']
            post.social_created_at = details['social_created_at']
            post.save()

    categorized_posts = {
        'Instagram': [],
        'Facebook': [],
        'YouTube': []
    }
    for post in posts:
        if post.platform in categorized_posts:
            categorized_posts[post.platform].append(post)

    return render(request, 'socialmedia.html', {'categorized_posts': categorized_posts, 'selected_platform': platform})

def fetch_post_details(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    details = {
        'title': '',
        'description': '',
        'preview_image': '',
        'social_created_at': None
    }

    # Fetch title
    title_tag = soup.find('meta', property='og:title')
    if title_tag:
        details['title'] = title_tag['content']

    # Fetch description
    description_tag = soup.find('meta', property='og:description')
    if description_tag:
        details['description'] = description_tag['content']

    # Fetch preview image
    image_tag = soup.find('meta', property='og:image')
    if image_tag:
        details['preview_image'] = image_tag['content']

    # Fetch creation date
    date_tag = soup.find('meta', property='article:published_time')
    if date_tag:
        details['social_created_at'] = date_tag['content']

    return details

def socialmedia(request):
    platform = request.GET.get('platform', 'All')
    if platform == 'All':
        posts = SocialMediaPost.objects.order_by('-created_at')[:6]
    else:
        posts = SocialMediaPost.objects.filter(platform=platform).order_by('-created_at')[:6]

    for post in posts:
        if not post.title or not post.description or not post.preview_image:
            details = fetch_post_details(post.platform_url)
            post.title = details['title']
            post.description = details['description']
            post.preview_image = details['preview_image']
            post.save()

    categorized_posts = {
        'Instagram': [],
        'Facebook': [],
        'YouTube': []
    }
    for post in posts:
        if post.platform in categorized_posts:
            categorized_posts[post.platform].append(post)

    return render(request, 'socialmedia.html', {'categorized_posts': categorized_posts, 'selected_platform': platform})

def delete_post(request, post_id):
    post = get_object_or_404(SocialMediaPost, id=post_id)
    post.delete()
    return redirect('socialmedia')