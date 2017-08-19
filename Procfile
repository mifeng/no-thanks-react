web: gunicorn noThanksApp.wsgi --log-file - && daphne noThanksApp.asgi.channel_layer 
worker: python manage.py runworker
