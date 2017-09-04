from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from channels import Group
import random

class Game(models.Model):
    GAME_STATUS = (
        ('A', 'Active'),
        ('W', 'Waiting'),
        ('C', 'Complete'),
    )
    status = models.CharField(max_length=30, choices=GAME_STATUS, default='W')
    creator = models.ForeignKey(User, related_name='creator', null=True)
    winner = models.ForeignKey(User, related_name='winner', null=True, blank=True)
    current_turn = models.ForeignKey(User, related_name="games_current_turn", null=True)
    first_player = models.ForeignKey(User, related_name="games_first_player")
    second_player = models.ForeignKey(User, related_name="games_second_player", null=True, blank=True)
    third_player = models.ForeignKey(User, related_name="games_third_player", null=True, blank=True)
    fourth_player = models.ForeignKey(User, related_name="games_fourth_player", null=True, blank=True)
    fifth_player = models.ForeignKey(User, related_name="games_fifth_player", null=True, blank=True)

    @staticmethod
    def create_new(user):
        new_game = Game(creator=user, current_turn=user, first_player=user)
        new_game.save()
        return new_game

    def add_user(self, user):
        if not self.second_player:
            self.second_player = user
            self.save()
            return {'game': self, 'playerNumber': 2}
        elif not self.third_player:
            self.third_player = user
            self.save()
            return {'game': self, 'playerNumber': 3}
        elif not self.fourth_player:
            self.fourth_player = user
            self.save()
            return {'game': self, 'playerNumber': 4}
        elif not self.fifth_player:
            self.fifth_player = user
            self.status = 'A'
            self.save()
            Group("socket").send({ "text": '{"trigger":"fetchGame"}' })
            return {'game': self, 'playerNumber': 5}
        else:
            return {'game': None, 'playerNumber': -1}

    def next_player_turn(self):
        if self.current_turn == self.first_player:
            self.current_turn = self.second_player
        elif self.current_turn == self.second_player:
            self.current_turn = self.third_player
        elif self.current_turn == self.third_player:
            self.current_turn = self.fourth_player
        elif self.current_turn == self.fourth_player:
            self.current_turn = self.fifth_player
        elif self.current_turn == self.fifth_player:
            self.current_turn = self.first_player
        self.save()

    def mark_complete(self, winner):
        self.winner = winner
        self.status = 'C'
        self.current_turn = None
        self.save()
