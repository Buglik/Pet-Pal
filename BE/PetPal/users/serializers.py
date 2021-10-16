from django.core.validators import MinLengthValidator
from rest_framework import serializers

from .models import User


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
