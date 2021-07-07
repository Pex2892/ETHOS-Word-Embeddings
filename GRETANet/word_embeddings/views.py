from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
import os
from .utility import load_model


def index(request):
    data = {
        'appname': 'word_embeddings',
        'title': 'Word Embeddings – GRETANet',
        'media_path': settings.MEDIA_URL,
    }
    return render(request, 'word_embeddings/index.html', data)


def run_nearest_words(request):
    model = load_model(int(request.POST['model_id']))

    positive_words = request.POST['positive_words'].split(',')

    negative_words = request.POST['negative_words'].split(',')

    topn = int(request.POST['topn'])

    if positive_words != '' and negative_words == '':
        results = model.most_similar(positive=positive_words, topn=topn)
    elif positive_words == '' and negative_words != '':
        results = model.most_similar(negative=negative_words, topn=topn)
    elif positive_words != '' and negative_words != '':
        results = model.most_similar(positive=positive_words, negative=negative_words, topn=topn)

    # print(results)

    html_str = '<div class="table-responsive"><table class="table"><thead class=" text-primary">' \
               '<tr><th> Pos. words </th><th> Neg. words </th><th> Results </th>' \
               '<th class="text-right"> Similarity </th></tr></thead>'

    for i in range(0, len(results)):
        html_str += f'<tr><td>{request.POST["positive_words"]}</td><td>{request.POST["negative_words"]}</td>' \
                    f'<td>{results[i][0]}</td><td class="text-right">{round(results[i][1], 4)}</td></tr>'
        # print(request.POST['positive_words'], request.POST['negative_words'], results[i][0], results[i][1])
    html_str += '</tbody></table>'

    return JsonResponse({'type': 'success', 'title': 'Success!', 'mess': 'Lorem ipsum', 'html': html_str})
