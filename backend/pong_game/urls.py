from django.urls import path
from .views import user_matches
from .views import all_matches

urlpatterns = [
    path('user-matches/<str:username>/', user_matches, name='user-matches'),
	path('all-matches/', all_matches, name='all-matches'),
]
