from django.conf import settings
import os
import gensim.downloader as api
from gensim.models import KeyedVectors
from gensim.scripts.glove2word2vec import glove2word2vec
from gensim.test.utils import datapath, get_tmpfile

def load_model(model_id):
    # print(list(gensim.downloader.info()['models'].keys()))  # lista modelli

    list_models = [
        'GRETA.....',
        'word2vec-google-news-300',
        'glove.6B.50d.txt',
        'glove.6B.100d.txt',
        'glove.6B.200d.txt',
        'glove.6B.300d.txt',
        'glove.42B.300d.txt',
        'glove.840B.300d.txt',
        'glove.twitter.27B.25d.txt',
        'glove.twitter.27B.50d.txt',
        'glove.twitter.27B.100d.txt',
        'glove.twitter.27B.200d.txt',
    ]

    if model_id == 0:
        print(os.path.join(settings.STATIC_DIR_WE, 'models', list_models[model_id]))
    elif model_id > 0:
        model = KeyedVectors.load_word2vec_format(os.path.join(settings.STATIC_DIR_WE, 'models', list_models[model_id]))
        # model = api.load(list_models[model_id])

    print(f'Carico il modello: {list_models[model_id]}')

    return model
