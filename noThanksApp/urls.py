"""noThanksApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/{{ docs_version }}/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from no_thanks import views as no_thanks_views
from no_thanks import api as no_thanks_api

urlpatterns = [
    # Views
    url(r'^admin/', admin.site.urls),
    url(r'^$', no_thanks_views.home, name='home'),
    url(r'^game/$', no_thanks_views.game, name='game'),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, name='logout'),

    # APIs
    # url(r'^api/getActiveUsers/$', no_thanks_api.active_users, name='active_users'),
    url(r'^api/getCurrentUser/$', no_thanks_api.current_user, name='current_user'),
    url(r'^api/getNewDeck/$', no_thanks_api.new_deck, name='new_deck'),
    url(r'^api/createNewGame/$', no_thanks_api.create_game, name='create_game'),
    url(r'^api/joinGame/$', no_thanks_api.join_game, name='join_game'),
    url(r'^api/fetchGame/$', no_thanks_api.fetch_game, name='fetch_game'),
]
