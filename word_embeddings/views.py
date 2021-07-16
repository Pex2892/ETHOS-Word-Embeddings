from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
import os
from .utility import load_model

model_ids_previous = []
model_loaded = []


def index(request):
    data = {
        'appname': 'word_embeddings',
        'title': 'Word Embeddings – ETHOS (fEatures TecHniques Outcomes Survey)',
        'media_path': settings.MEDIA_URL,
    }
    return render(request, 'word_embeddings/index.html', data)


def run_nearest_words(request):
    global model_ids_previous
    global model_loaded

    if len(model_ids_previous) == 0 or int(request.POST['model_id']) not in model_ids_previous:
        model_ids_previous.append(int(request.POST['model_id']))
        model_loaded.append(load_model(int(request.POST['model_id'])))

    positive_words = request.POST['positive_words'].strip()
    if positive_words == '':
        positive_words = None
    else:
        positive_words = positive_words.split(',')

    negative_words = request.POST['negative_words'].strip()
    if negative_words == '':
        negative_words = None
    else:
        negative_words = negative_words.split(',')

    topn = int(request.POST['topn'])

    if positive_words is not None and negative_words is None:
        results = model_loaded[model_ids_previous.index(int(request.POST['model_id']))].most_similar(positive=positive_words, topn=topn)
    elif positive_words is None and negative_words is not None:
        results = model_loaded[model_ids_previous.index(int(request.POST['model_id']))].most_similar(negative=negative_words, topn=topn)
    elif positive_words is not None and negative_words is not None:
        results = model_loaded[model_ids_previous.index(int(request.POST['model_id']))].most_similar(positive=positive_words, negative=negative_words, topn=topn)
    else:
        return JsonResponse({'type': 'error', 'title': 'Errore', 'mess': 'Lorem ipsum', 'html': ''})

    # BISOGNA GESTIRE CON IL TRY LA NON PRESENZA DI UNA DELLE CHIAVI

    # print(results)

    html_str = '<div class="table-responsive"><table class="table"><thead class=" text-primary">' \
               '<tr><th> Pos. words </th><th> Neg. words </th><th> Results </th>' \
               '<th class="text-right"> Similarity </th></tr></thead><tbody>'

    for i in range(0, len(results)):
        html_str += f'<tr><td>{request.POST["positive_words"]}</td><td>{request.POST["negative_words"]}</td>' \
                    f'<td>{results[i][0]}</td><td class="text-right">{round(results[i][1], 4)}</td></tr>'
        # print(request.POST['positive_words'], request.POST['negative_words'], results[i][0], results[i][1])
    html_str += '</tbody></table>'

    return JsonResponse({'type': 'success', 'title': 'Success!', 'mess': 'Lorem ipsum', 'html': html_str})


def run_similarity_words(request):
    model = load_model(int(request.POST['model_id']))

    word1 = request.POST['word1']

    word2 = request.POST['word2']

    results = model.similarity(word1, word2)

    html_str = '<div class="table-responsive"><table class="table"><thead class=" text-primary">' \
               '<tr><th> Word1 </th><th> Word2 </th><th class="text-right"> Similarity </th></tr></thead><tbody>' \
               f'<tr><td>{word1}</td><td>{word2}</td><td class="text-right">{round(float(results), 4)}</td></tr></tbody></table>'

    return JsonResponse({'type': 'success', 'title': 'Success!', 'mess': 'Lorem ipsum', 'html': html_str})


def run_word_analogy(request):
    model = load_model(int(request.POST['model_id']))

    word1 = request.POST['word1']

    word2 = request.POST['word2']

    word3 = request.POST['word3']

    results = model.most_similar(positive=[word3, word2], negative=[word1])
    print(results)
