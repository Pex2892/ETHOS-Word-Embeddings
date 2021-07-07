from django.conf import settings
import os
import gensim.downloader as api


def load_model(model_id):
    # print(list(gensim.downloader.info()['models'].keys()))  # lista modelli

    list_models = [
        'GRETA.....',
        'word2vec-google-news-300',
        'glove-twitter-25'
    ]

    if model_id == 0:
        print(os.path.join(settings.STATIC_DIR_WE, 'models', list_models[model_id]))
    elif model_id > 0:
        model = api.load(list_models[model_id])

    return model