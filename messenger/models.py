from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=100)
    second_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    biography = models.TextField(max_length=5000)

    def __str__(self):
        return self.first_name


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=5000, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    replies = models.ManyToManyField('self', blank=True)
    is_reply = models.BooleanField(default=False)
    attachment = models.FileField(upload_to='attachments/', blank=True, null=True)
    caption = models.TextField(max_length=5000, blank=True, null=True)

    def __str__(self):
        return self.text or "Attachment"