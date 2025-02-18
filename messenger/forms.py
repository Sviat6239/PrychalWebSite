from django import forms
from .models import Chat, Message

class ChatForm(forms.ModelForm):
    class Meta:
        model = Chat
        fields = ['name', 'users', 'is_private', 'attachment']
        widgets = {
            'users': forms.CheckboxSelectMultiple(),
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter chat name'}),
            'is_private': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'attachment': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['text', 'attachment', 'caption']
        widgets = {
            'text': forms.Textarea(attrs={'class': 'form-control', 'rows': 3, 'placeholder': 'Enter message'}),
            'caption': forms.Textarea(attrs={'class': 'form-control', 'rows': 2, 'placeholder': 'Enter caption'}),
            'attachment': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }
