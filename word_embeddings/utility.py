from django.conf import settings
import os
from gensim.models import KeyedVectors
from gensim.models import Word2Vec
import numpy as np


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


def normalize(fulltext, is_lemma: bool = False) -> list:
    # Tokenization, is_stop, is_punct, is_space, Lemmatization
    words_base = []
    words_lemma = []
    for token in fulltext:
        if not token.is_stop:
            if not token.is_punct:
                if not token.is_space:
                    if not token.pos_ == 'NUM' and not token.pos_ == 'SYM':
                        if len(token.text) > 2:
                            # print(token.text.lower(),  token.lemma_.lower())
                            words_base.append(token.text.lower())
                            words_lemma.append(token.lemma_.lower())
    if is_lemma:
        return words_lemma
    return words_base


def to_vectorize(model, words):
    word_vecs = []
    for word in words:
        try:
            vec = model[word]
            word_vecs.append(vec)
        except KeyError:
            # Ignore, if the word doesn't exist in the vocabulary
            pass

    # Assuming that document vector is the mean of all the word vectors
    vector = np.mean(word_vecs, axis=0)
    return vector


def cosine_sim(vecA, vecB):
    """Find the cosine similarity distance between two vectors."""
    csim = np.dot(vecA, vecB) / (np.linalg.norm(vecA) * np.linalg.norm(vecB))
    if np.isnan(np.sum(csim)):
        return 0
    return csim