import datetime
import uuid

import jwt
from rest_framework_simplejwt.tokens import RefreshToken

from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

from .models import User
from .serializers import MeResponseSerializer


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


def decode_access_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        user = User.objects.get(id=payload['user_id'])
        serializer = MeResponseSerializer(user)
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('User not found')
    return serializer



