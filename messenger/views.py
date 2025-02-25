from django.contrib.auth.views import LoginView, LogoutView
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from .models import Chat, Message
from .forms import ChatForm, MessageForm


class CustomLoginView(LoginView):
    template_name = 'login.html'
    redirect_authenticated_user = True


class CustomLogoutView(LogoutView):
    next_page = 'login'


@login_required
def dashboard_view(request):
    user_chats = Chat.objects.filter(participants=request.user).order_by('-last_message_time')
    context = {
        'chats': user_chats
    }
    return render(request, 'dashboard.html', context)


@login_required
def messenger_view(request, chat_id=None):
    if chat_id:
        chat = get_object_or_404(Chat, id=chat_id, participants=request.user)
        messages = chat.message_set.order_by('timestamp')
        form = MessageForm()
    else:
        # If no chat specified, maybe show a list of chats or a welcome message
        chat = None
        messages = []
        form = MessageForm()

    context = {
        'chat': chat,
        'messages': messages,
        'form': form
    }
    return render(request, 'messenger.html', context)


@login_required
@require_http_methods(['GET', 'POST'])
def create_chat(request):
    if request.method == 'POST':
        form = ChatForm(request.POST)
        if form.is_valid():
            chat = form.save(commit=False)
            chat.save()
            chat.participants.add(request.user)  # Add creator to the chat
            # Assuming your Chat model has a `participants` many-to-many field

            if request.headers.get('x-requested-with') == 'XMLHttpRequest':  # Check if it's an AJAX request
                return JsonResponse({
                    'success': True,
                    'chat_id': chat.id,
                    'chat_name': chat.name
                })
            else:
                messages.success(request, 'Chat created successfully!')
                return redirect('dashboard')  # Or wherever you redirect after creating a chat
    else:
        form = ChatForm()

    return render(request, 'messenger/create_chat.html', {'form': form})


@login_required
@require_http_methods(['GET', 'POST'])
def edit_chat(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id, participants=request.user)
    if request.method == 'POST':
        form = ChatForm(request.POST, instance=chat)
        if form.is_valid():
            form.save()
            messages.success(request, 'Chat updated successfully!')
            return redirect('dashboard')
    else:
        form = ChatForm(instance=chat)
    return render(request, 'messenger/edit_chat.html', {'form': form, 'chat': chat})


@login_required
@require_http_methods(['GET', 'POST'])
def delete_chat(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id, participants=request.user)
    if request.method == 'POST':
        chat.delete()
        messages.warning(request, 'Chat deleted successfully!')
        return redirect('dashboard')
    return render(request, 'messenger/delete_chat.html', {'chat': chat})


@login_required
@require_http_methods(['GET', 'POST'])
def create_message(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id, participants=request.user)
    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.chat = chat
            message.user = request.user
            message.save()
            # Update last message time for sorting in dashboard
            chat.last_message_time = message.timestamp
            chat.save()
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'success': True})
            else:
                messages.success(request, 'Message sent successfully!')
                return redirect('messenger', chat_id=chat_id)
    else:
        form = MessageForm()
    return render(request, 'messenger/create_message.html', {'form': form, 'chat': chat})


@login_required
@require_http_methods(['GET', 'POST'])
def edit_message(request, message_id):
    message = get_object_or_404(Message, id=message_id, user=request.user)
    if request.method == 'POST':
        form = MessageForm(request.POST, instance=message)
        if form.is_valid():
            form.save()
            messages.success(request, 'Message updated successfully!')
            return redirect('messenger', chat_id=message.chat.id)
    else:
        form = MessageForm(instance=message)
    return render(request, 'messenger/edit_message.html', {'form': form})


@login_required
@require_http_methods(['GET', 'POST'])
def delete_message(request, message_id):
    message = get_object_or_404(Message, id=message_id, user=request.user)
    if request.method == 'POST':
        chat_id = message.chat.id
        message.delete()
        messages.warning(request, 'Message deleted successfully!')
        return redirect('messenger', chat_id=chat_id)
    return render(request, 'messenger/delete_message.html', {'message': message})

@login_required
def load_chat(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id, participants=request.user)
    messages = chat.message_set.order_by('timestamp')
    chat_data = {
        'chat_name': chat.name,
        'messages': [{'content': msg.text, 'is_user': msg.user == request.user} for msg in messages]
    }
    return JsonResponse(chat_data)