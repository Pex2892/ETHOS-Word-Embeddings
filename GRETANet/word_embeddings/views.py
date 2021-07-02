from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings


def index(request):
    data = {
        'appname': 'uissMTB',
        'title': 'Word E',
        'media_path': settings.MEDIA_URL,
    }
    return render(request, 'word_embeddings/index.html', data)