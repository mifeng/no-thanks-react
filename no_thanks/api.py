from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from channels import Group
from channels.handler import AsgiHandler
from no_thanks.serializers import *
from .models import Game
import random, json

players = []
base_arr = list(range(3, 35))
random.shuffle(base_arr)
deck = base_arr[:26]
current_card_index = 0
current_player_index = 0
cards = [[],[],[],[],[]]
coins = [9,9,9,9,9]
center_coin_count = 0

def current_user(request):
    serializer = UserSerializer(request.user)
    return JsonResponse(serializer.data)

def create_game(request):
    Group("socket").send({ "text": '{"event":"new game started","trigger":"fetchGame"}' })
    serializer = GameSerializer(Game.create_new(request.user))
    global players
    players.append(request.user.username)
    return JsonResponse({'game': serializer.data })

@csrf_exempt
def join_game(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))
        current_game = Game.objects.get(pk=data['id'])
        res = Game.add_user(current_game, request.user)
        global players
        players.append(request.user.username)
        return JsonResponse({'game': GameSerializer(res['game']).data })

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


def switch_turn():
    global current_player_index
    if current_player_index == 4:
        current_player_index = 0
    else:
        current_player_index += 1
    print current_player_index

def format_response():
    global cards
    global coins
    global deck
    global current_card_index
    global players
    global current_player_index
    global center_coin_count
    return JsonResponse({
        "players": players,
        "cards": cards,
        "coins": coins,
        "current_card": deck[current_card_index],
        "center_coin_count": center_coin_count,
        "current_player": players[current_player_index],
    })

def end_game():
    g = Game.objects.filter(status='A')[0]
    scores = [0, 0, 0, 0, 0]
    for i in range(5):
        card_arr = cards[i]
        if len(card_arr) > 0:
            scores[i] = card_arr[0]
            for j in range(1, len(card_arr)):
                if card_arr[j] - card_arr[j - 1] != 1:
                    scores[i] += card_arr[j]
        scores[i] -= coins[i]
    winner_index = scores.index(min(scores))
    winner = User.objects.filter(username=players[winner_index])[0]
    Game.mark_complete(g, winner)
    return players[winner_index]

def take_card(request):
    global cards
    global coins
    global deck
    global current_card_index
    global players
    global current_player_index
    global center_coin_count
    i = players.index(request.user.username)
    cards[i].append(deck[current_card_index])
    cards[i].sort()
    coins[i] += center_coin_count
    center_coin_count = 0
    if current_card_index == 25:
        winner = end_game()

        players = []
        base_arr = list(range(3, 35))
        random.shuffle(base_arr)
        deck = base_arr[:26]
        current_card_index = 0
        current_player_index = 0
        cards = [[],[],[],[],[]]
        coins = [9,9,9,9,9]
        center_coin_count = 0

        Group("socket").send({ "text": '{"event": "game over","trigger":"endGame","args":"' + winner +'"}' })
    else:
        current_card_index += 1
        current_card = deck[current_card_index]
        Group("socket").send({ "text": '{"event": "' + request.user.username + ' took card","trigger":"fetchCards"}' })
    return JsonResponse({ "data": None })

def skip_card(request):
    global coins
    global players
    global center_coin_count
    i = players.index(request.user.username)
    coins[i] -= 1
    center_coin_count += 1
    switch_turn()
    Group("socket").send({ "text": '{"event": "' + request.user.username + ' skipped card","trigger":"fetchCards"}' })
    return JsonResponse({ "data": None })

def fetch_cards(request):
    global players
    if len(players) == 0:
        g = Game.objects.filter(status='A')[0]
        players = [
            g.first_player.username,
            g.second_player.username,
            g.third_player.username,
            g.fourth_player.username,
            g.fifth_player.username,
        ]
    return format_response()
