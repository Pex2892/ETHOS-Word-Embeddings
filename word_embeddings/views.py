from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from .utility import load_model, normalize
import spacy
from statistics import mean, stdev
import spacy.cli
spacy.cli.download("en_core_web_lg")


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

    try:
        this_model = model_loaded[model_ids_previous.index(int(request.POST['model_id']))]

        if positive_words is not None and negative_words is None:
            results = this_model.most_similar(positive=positive_words, topn=topn)
        elif positive_words is None and negative_words is not None:
            results = this_model.most_similar(negative=negative_words, topn=topn)
        elif positive_words is not None and negative_words is not None:
            results = this_model.most_similar(positive=positive_words, negative=negative_words, topn=topn)
        else:
            return JsonResponse({'type': 'error', 'title': '<b>An error has occurred</b>',
                                 'message': 'You have not entered any words.<br />Please try again.', 'html': ''})
    except KeyError as ke:
        return JsonResponse({'type': 'error', 'title': '<b>An error has occurred</b>',
                             'message': f'<b>{ke}</b>.<br />Please try again.', 'html': ''})

    html_str = '<div class="table-responsive"><table class="table"><thead class=" text-primary">' \
               '<tr><th> Position </th><th> Pos. words </th><th> Neg. words </th><th> Results </th>' \
               '<th class="text-right"> Score </th></tr></thead><tbody>'

    for i in range(0, len(results)):
        html_str += f'<tr><td>{(i + 1)}</td><td>{request.POST["positive_words"]}</td><td>{request.POST["negative_words"]}</td>' \
                    f'<td>{results[i][0]}</td><td class="text-right">{round(results[i][1], 4)}</td></tr>'
        # print(request.POST['positive_words'], request.POST['negative_words'], results[i][0], results[i][1])
    html_str += '</tbody></table>'

    return JsonResponse({'type': 'success', 'title': 'Finished!', 'message': 'Running successfully completed',
                         'html': html_str})


def run_similarity_words(request):
    global model_ids_previous
    global model_loaded

    if len(model_ids_previous) == 0 or int(request.POST['model_id']) not in model_ids_previous:
        model_ids_previous.append(int(request.POST['model_id']))
        model_loaded.append(load_model(int(request.POST['model_id'])))

    words_1 = request.POST['words_1'].strip()
    if words_1 == '':
        words_1 = None
    else:
        words_1 = words_1.split(',')

    words_2 = request.POST['words_2'].strip()
    if words_2 == '':
        words_2 = None
    else:
        words_2 = words_2.split(',')
    try:
        if words_1 is None or words_2 is None:
            return JsonResponse({'type': 'error', 'title': '<b>An error has occurred</b>',
                                 'message': 'You have not entered any words.<br />Please try again.', 'html': ''})
        elif words_1 is not None and words_2 is not None:
            this_model = model_loaded[model_ids_previous.index(int(request.POST['model_id']))]
            results = this_model.n_similarity(words_1, words_2)
    except KeyError as ke:
        return JsonResponse({'type': 'error', 'title': '<b>An error has occurred</b>',
                             'message': f'<b>{ke}</b>.<br />Please try again.', 'html': ''})

    html_str = '<div class="table-responsive"><table class="table"><thead class=" text-primary">' \
               '<tr><th> Words 1 </th><th> Words 2 </th><th class="text-right"> Similarity </th></tr></thead><tbody>' \
               f'<tr><td>{request.POST["words_1"].strip()}</td><td>{request.POST["words_2"].strip()}</td><td class="text-right">{round(float(results), 4)}</td>' \
               f'</tr></tbody></table>'

    return JsonResponse({'type': 'success', 'title': 'Finished!', 'message': 'Running successfully completed',
                         'html': html_str})


def run_word_analogy(request):
    global model_ids_previous
    global model_loaded

    if len(model_ids_previous) == 0 or int(request.POST['model_id']) not in model_ids_previous:
        model_ids_previous.append(int(request.POST['model_id']))
        model_loaded.append(load_model(int(request.POST['model_id'])))

    word1 = request.POST['word1']
    if word1 == '':
        word1 = None

    word2 = request.POST['word2']
    if word2 == '':
        word2 = None

    word3 = request.POST['word3']
    if word3 == '':
        word3 = None

    topn = int(request.POST['topn'])

    try:
        if word1 is not None and word2 is not None and word3 is not None:
            this_model = model_loaded[model_ids_previous.index(int(request.POST['model_id']))]

            results = this_model.most_similar(positive=[word3, word2], negative=[word1], topn=topn)
        else:
            return JsonResponse({'type': 'error', 'title': '<b>An error has occurred</b>',
                                 'message': 'You have not entered any words.<br />Please try again.', 'html': ''})
    except KeyError as ke:
        return JsonResponse({'type': 'error', 'title': '<b>An error has occurred</b>',
                             'message': f'<b>{ke}</b>.<br />Please try again.', 'html': ''})

    html_str = '<div class="table-responsive"><table class="table"><thead class=" text-primary">' \
               '<tr><th> Position </th><th> Word 1 </th><th> Word 2 </th><th> Word 3 </th><th> Results </th>' \
               '<th class="text-right"> Score </th></tr></thead><tbody>'

    for i in range(0, len(results)):
        html_str += f'<tr><td>{(i + 1)}</td><td>{word1}</td><td>{word2}</td><td>{word3}</td><td>{results[i][0]}</td>' \
                    f'<td class="text-right">{round(results[i][1], 4)}</td></tr>'
    html_str += '</tbody></table>'

    return JsonResponse({'type': 'success', 'title': 'Finished!', 'message': 'Running successfully completed',
                         'html': html_str})


def run_eval_uncertainty(request):
    global model_ids_previous
    global model_loaded

    if len(model_ids_previous) == 0 or int(request.POST['model_id']) not in model_ids_previous:
        model_ids_previous.append(int(request.POST['model_id']))
        model_loaded.append(load_model(int(request.POST['model_id'])))

    text = request.POST['text']
    if text == '':
        text = None

    if text is None:
        return JsonResponse({'type': 'error', 'title': '<b>An error has occurred</b>',
                             'message': 'You have not entered any words.<br />Please try again.', 'html': ''})
    else:
        nlp = spacy.load('en_core_web_lg')
        nlp.max_length = 3500000
        list_of_words = normalize(nlp(text), is_lemma=True)
        # print(list_of_words)
        score = []
        this_model = model_loaded[model_ids_previous.index(int(request.POST['model_id']))]
        for w1 in list_of_words:
            try:
                # print(w1)
                words_res = this_model.most_similar(positive=[w1], topn=1)
                score.append(words_res[0][1])
                # print(words_res)
                # score.append(mean([w2[1] for w2 in words_res]))
            except KeyError as ke:
                # print(ke)
                score.append(0)

        # print(score)

        mean_res = mean(score)
        stdev_res = stdev(score)
        # print(f'mean: {mean_res} - sd: {stdev_res}')

        if mean_res > 0.60:
            text_recognised = round(mean_res * 100, 1)
            uncertainty_score = round(100 - text_recognised, 1)
        elif 0.50 <= mean_res <= 0.60:
            text_recognised = round((mean_res - (stdev_res / 2)) * 100, 1)
            uncertainty_score = round(100 - text_recognised, 1)
        else:
            uncertainty_score = round((mean_res + stdev_res) * 100, 1)
            text_recognised = round(100 - uncertainty_score, 1)

        html_str = '<div class="table-responsive"><table class="table"><thead class=" text-primary">' \
                   '<tr><th> Text </th><th> Text recognised </th><th class="text-right"> Uncertainty score </th></tr></thead><tbody>' \
                   f'<tr><td class="text-justify">{text}</td><td class="text-right">{text_recognised}%</td><td class="text-right">{uncertainty_score}%</td>' \
                   f'</tr></tbody></table>'

        return JsonResponse({'type': 'success', 'title': 'Finished!', 'message': 'Running successfully completed',
                             'html': html_str})
