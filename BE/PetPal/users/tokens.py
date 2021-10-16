import datetime

import jwt

from django.conf import settings

from .models import User


def generate_activation_token(user):
    payload = {
        'id': str(user.id),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=48),
        'iat': datetime.datetime.utcnow()
    }

    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')


def decode_activation_token(token):
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    return User.objects.get(id=payload['id'])
