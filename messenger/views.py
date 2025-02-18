from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Chat, Message, User
from .forms import ChatForm, MessageForm

class CustomLoginView(LoginView):
    template_name = 'login.html'

class CustomLogoutView(LogoutView):
    next_page = 'login'

@login_required
def dashboard_view(request):
    return render(request, 'dashboard.html')

@login_required
def create_chat(request):
    if request.method == 'POST':
        form = ChatForm(request.POST, request.FILES)
        if form.is_valid():
            chat = form.save(commit=False)
            chat.save()
            form.save_m2m()
            return redirect('dashboard')
    else:
        form = ChatForm()
    return render(request, 'messenger/create_chat.html', {'form': form})

@login_required
def edit_chat(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id)
    if request.method == 'POST':
        form = ChatForm(request.POST, request.FILES, instance=chat)
        if form.is_valid():
            form.save()
            return redirect('dashboard')
    else:
        form = ChatForm(instance=chat)
    return render(request, 'messenger/edit_chat.html', {'form': form})

@login_required
def delete_chat(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id)
    if request.method == 'POST':
        chat.delete()
        return redirect('dashboard')
    return render(request, 'messenger/delete_chat.html', {'chat': chat})

@login_required
def create_message(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id)
    if request.method == 'POST':
        form = MessageForm(request.POST, request.FILES)
        if form.is_valid():
            message = form.save(commit=False)
            message.user = request.user
            message.save()
            chat.messages.add(message)
            return redirect('dashboard')
    else:
        form = MessageForm()
    return render(request, 'messenger/create_message.html', {'form': form, 'chat': chat})

@login_required
def edit_message(request, message_id):
    message = get_object_or_404(Message, id=message_id)
    if request.method == 'POST':
        form = MessageForm(request.POST, request.FILES, instance=message)
        if form.is_valid():
            form.save()
            return redirect('dashboard')
    else:
        form = MessageForm(instance=message)
    return render(request, 'messenger/edit_message.html', {'form': form})

@login_required
def delete_message(request, message_id):
    message = get_object_or_404(Message, id=message_id)
    if request.method == 'POST':
        message.delete()
        return redirect('dashboard')
    return render(request, 'messenger/delete_message.html', {'message': message})