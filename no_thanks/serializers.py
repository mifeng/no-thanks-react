from django.contrib.auth.models import User
from .models import Game, Move
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'groups', 'first_name')

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'status','current_turn',
        'first_player','second_player','third_player','fourth_player','fifth_player')
        depth = 1

class MoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Move

# class GameSquareSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GameSquare
#         fields = ('id', 'game', 'owner', 'status', 'row', 'col')
#
# class GameLogSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GameLog
#         fields = ('id', 'text', 'player', 'created')
#         depth = 1
