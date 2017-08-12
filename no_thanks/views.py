from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.models import User

def home(request):
    return render(request, 'main/home.html')

def game(request):
    if (request.user.is_authenticated):
        return render(request, 'main/game.html')
    else:
        return redirect('login');
