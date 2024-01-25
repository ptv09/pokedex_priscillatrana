from django.shortcuts import render
from django.http import JsonResponse
import requests
#Importa los módulos necesarios de Django y la librería requests para realizar solicitudes HTTP.

#hace una solicitud a la PokeAPI para obtener información solicitada
def pokemon_list(request):
    pokemon_data = []
    URL = "https://pokeapi.co/api/v2/pokemon/"

    for i in range(1, 51):
        response = requests.get(f"{URL}{i}")
        data = response.json()
        pokemon_data.append({
            'id': data['id'],
            'name': data['name'],
            'height': data['height'],
            'weight': data['weight'],
            'types': [t['type']['name'] for t in data['types']],
        })

    return JsonResponse({'pokemon_data': pokemon_data})
#se renderiza el archivo htmkl dentro de la carpeta de templates
def pokemon_list(request):
    return render(request, 'pokedex_app/pokemon_list.html')




