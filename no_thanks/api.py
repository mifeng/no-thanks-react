from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from channels import Group
from channels.handler import AsgiHandler
from no_thanks.serializers import *
import random, json

from .models import Game, Move

def new_deck(request):
    base_arr = list(range(1, 35))
    random.shuffle(base_arr)
    return JsonResponse({'deck': base_arr[:27]})

# def active_users(request):
#     sessions = Session.objects.filter(expire_date__gte=timezone.now())
#     uid_list = []
#
#     for session in sessions:
#         data = session.get_decoded()
#         uid_list.append(data.get('_auth_user_id', None))
#
#     return JsonResponse({'data': User.objects.filter(id__in=uid_list)})

def current_user(request):
    serializer = UserSerializer(request.user)
    return JsonResponse(serializer.data)

@csrf_exempt
def join_game(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))
        current_game = Game.objects.get(pk=data['id'])
        res = Game.add_user(current_game, request.user)
        return JsonResponse({'game': GameSerializer(res['game']).data, 'playerNumber': res['playerNumber'] })

def fetch_game(request):
    games = Game.objects.filter(status='A')
    if games:
        serializer = GameSerializer(games[0])
        return JsonResponse({'game': serializer.data})
    else:
        games = Game.objects.filter(status='W')
        if games:
            serializer = GameSerializer(games[0])
            return JsonResponse({'game': serializer.data})
        else:
            return JsonResponse({'game': None})

def create_game(request):
    Group("socket").send({ "text": '{"event":"new game started","trigger":"fetchGame"}' })
    serializer = GameSerializer(Game.create_new(request.user))
    return JsonResponse({'game': serializer.data, 'playerNumber': 1})
