from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='word-embeddings'),
    path('runNearestWords/', views.run_nearest_words, name='run-nearest-words'),
    path('runSimilarityWords/', views.run_similarity_words, name='run-similarity-words'),
    path('runWordAnalogy/', views.run_word_analogy, name='run-word-analogy'),
    path('runEvalUncertainty/', views.run_eval_uncertainty, name='run-eval-uncertainty'),
]