from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from no_thanks import views as no_thanks_views
from no_thanks import api as no_thanks_api
# from no_thanks_api import G

urlpatterns = [
    # Views
    url(r'^admin/', admin.site.urls),
    url(r'^$', no_thanks_views.home, name='home'),
    url(r'^game/$', no_thanks_views.game, name='game'),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, name='logout'),

    # APIs
    url(r'^api/getCurrentUser/$', no_thanks_api.current_user, name='current_user'),
    url(r'^api/createNewGame/$', no_thanks_api.create_game, name='create_game'),
    url(r'^api/joinGame/$', no_thanks_api.join_game, name='join_game'),
    url(r'^api/fetchGame/$', no_thanks_api.fetch_game, name='fetch_game'),
    url(r'^api/fetchCards/$', no_thanks_api.fetch_cards, name='fetch_cards'),
    url(r'^api/takeCard/$', no_thanks_api.take_card, name='take_card'),
    url(r'^api/skipCard/$', no_thanks_api.skip_card, name='skip_card'),
]
