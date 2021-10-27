from rest_framework import serializers

from .models import Profile
from users.serializers import UserSerializer


class MeResponseSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['bio', 'user', 'experience', 'city', 'country', 'is_pet_sitter', 'is_pet_owner']
