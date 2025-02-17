from django.shortcuts import render
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
import threading
import time

posts_data = {}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

URLS = {
    'youtube': "https://www.youtube.com/@baptistgdynia2356/videos",
    'instagram_main': "https://www.instagram.com/prichalgdynia/",
    'instagram_teens': "https://www.instagram.com/gp_teens/",
    'facebook': "https://www.facebook.com/people/%D0%A6%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C-%D0%95%D0%A5%D0%91-%D0%B2-%D0%93%D0%B4%D1%8B%D0%BD%D0%B5/100081609697498/"
}

SELECTORS = {
    'youtube': 'a#video-title',
    'instagram_main': 'article a',
    'instagram_teens': 'article a',
    'facebook': 'div[data-ad-preview="message"]'
}


def fetch_latest_posts(url, selector):
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()

        # Check if the response is from Facebook, indicating a potential issue
        if "facebook.com" in url and response.status_code == 400:
            print(f"🚨 Bad Request for Facebook URL: {url}. Consider using the Facebook Graph API.")
            return []

        soup = BeautifulSoup(response.text, "html.parser")
        elements = soup.select(selector)[:6]

        posts = []
        for element in elements:
            try:
                post_data = {
                    'url': element.get('href', ''),
                    'thumbnail': element.find('img')['src'] if element.find('img') else '',
                    'caption': element.get_text(strip=True) or 'No description'
                }
                posts.append(post_data)
            except Exception as e:
                print(f"⚠ Error processing post: {e}")

        return posts

    except requests.RequestException as e:
        print(f"🚨 Request error {url}: {e}")
        return []


def update_posts():
    global posts_data

    for platform, url in URLS.items():
        new_posts = fetch_latest_posts(url, SELECTORS.get(platform, ''))
        if new_posts:
            posts_data[platform] = new_posts[-6:]

    threading.Timer(300, update_posts).start()


update_posts()


def socialmedia_data(request, platform):
    data = posts_data.get(platform, [])
    return JsonResponse(data, safe=False)


def index(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def contacts(request):
    return render(request, 'contacts.html')


def socialmedia(request):
    return render(request, 'socialmedia.html')
