from django.urls import path
from .views import pokemon_list
#se define la ruta de url 
urlpatterns = [
    path('list/', pokemon_list, name='pokemon_list'),

]
