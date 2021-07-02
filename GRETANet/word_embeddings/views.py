from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings


def index(request):
    data = {
        'appname': 'word_embeddings',
        'title': 'Word Embeddings – GRETANet',
        'media_path': settings.MEDIA_URL,
    }
    return render(request, 'word_embeddings/index.html', data)