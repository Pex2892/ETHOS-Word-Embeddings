from django.conf import settings
import os
from gensim.models import KeyedVectors
from gensim.models import Word2Vec


def load_model(model_id):
    # print(list(gensim.downloader.info()['models'].keys()))  # lista modelli

    list_models = [
        'ETHOS.model',
        'pubmed...',
        'glove.6B.100d.txt',
        'fast',
    ]

    if model_id == 0:
        model = Word2Vec.load(os.path.join(settings.STATIC_DIR_WE, 'models', list_models[model_id])).wv
    elif model_id > 0:
        model = KeyedVectors.load_word2vec_format(os.path.join(settings.STATIC_DIR_WE, 'models', list_models[model_id]))
        # model = api.load(list_models[model_id])

    # print(f'Carico il modello: {list_models[model_id]}')

    return model
