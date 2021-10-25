import os.path

from django.core.validators import MinLengthValidator
from rest_framework import serializers

from .models import User, Profile
from rest_framework_simplejwt.tokens import RefreshToken

from django.conf import settings


class RegisterRequestSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=50, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginRequestSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, write_only=True)
    password = serializers.CharField(max_length=50, validators=[MinLengthValidator(8)], write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']


class LoginResponseSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()


class LogoutRequestSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class MeResponseSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField('get_avatar_href')

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'avatar']

    def get_avatar_href(self, user):
        # TODO: replace
        if (user.image):
            return 'http://localhost:8000' + user.image.url
        else:
            return None
# class MyProfileResponseSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Profile
#         fields = []
