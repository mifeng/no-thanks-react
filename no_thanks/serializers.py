from django.contrib.auth.models import User
from .models import Game, Move
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'status','current_turn', 'deck',
        'first_player','second_player','third_player','fourth_player','fifth_player')
        depth = 1

class MoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Move
