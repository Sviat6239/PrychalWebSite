"""
URL configuration for PrychalWebSite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from Contacts import views as contact_views
from messenger.views import (
    CustomLoginView,
    CustomLogoutView,
    dashboard_view,
    messenger_view,
    create_chat,
    edit_chat,
    delete_chat,
    create_message,
    edit_message,
    delete_message,
    load_chat
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', contact_views.index, name='index'),
    path('about/', contact_views.about, name='about'),
    path('contacts/', contact_views.contacts, name='contacts'),
    path('socialmedia/', contact_views.socialmedia, name='socialmedia'),
    path('delete_post/<int:post_id>/', contact_views.delete_post, name='delete_post'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
    path('dashboard/', dashboard_view, name='dashboard'),
    path('messenger/', messenger_view, name='messenger'),
    path('messenger/chat/<int:chat_id>/', load_chat, name='load_chat'),
    # Chat operations
    path('messenger/create_chat/', create_chat, name='create_chat'),
    path('messenger/edit_chat/<int:chat_id>/', edit_chat, name='edit_chat'),
    path('messenger/delete_chat/<int:chat_id>/', delete_chat, name='delete_chat'),
    # Message operations
    path('messenger/create_message/<int:chat_id>/', create_message, name='create_message'),
    path('messenger/edit_message/<int:message_id>/', edit_message, name='edit_message'),
    path('messenger/delete_message/<int:message_id>/', delete_message, name='delete_message'),
]
