web: gunicorn noThanksApp.wsgi --log-file - && daphne noThanksApp.asgi:channel_layer --bind 0.0.0.0 -v2
worker: python manage.py runworker -v2
