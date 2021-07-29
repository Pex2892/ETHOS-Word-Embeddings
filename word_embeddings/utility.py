from django.conf import settings
import os
from gensim.models import KeyedVectors
from gensim.models import Word2Vec


def load_model(model_id):
    # print(list(gensim.downloader.info()['models'].keys()))  # lista modelli

    list_models = [
        ('ETHOS.model', 'gensim'),
    ]

    '''list_models = [
        ('ETHOS.model', 'gensim'),
        ('wikipedia-pubmed-and-PMC-w2v.bin', 'vector_binary'),
        ('glove.6B.100d.txt', 'vector'),
        ('wiki-news-300d-1M.vec', 'vector'),
    ]'''

    if list_models[model_id][1] == 'gensim':
        model = Word2Vec.load(os.path.join(settings.STATIC_DIR_WE, 'models', list_models[model_id][0])).wv
    elif list_models[model_id][1] == 'vector':
        model = KeyedVectors.load_word2vec_format(
            os.path.join(settings.STATIC_DIR_WE, 'models', list_models[model_id][0]))
    elif list_models[model_id][1] == 'vector_binary':
        model = KeyedVectors.load_word2vec_format(
            os.path.join(settings.STATIC_DIR_WE, 'models', list_models[model_id][0]), binary=True)

    return model
