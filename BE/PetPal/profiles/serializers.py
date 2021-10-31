from rest_framework import serializers
from users.serializers import UserSerializer, UserResponseSerializer, UserUpdateRequestSerializer

from .models import Profile


class MeResponseSerializer(serializers.ModelSerializer):
    user = UserResponseSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['bio', 'user', 'experience', 'city', 'country', 'is_pet_sitter', 'is_pet_owner']


class ProfileRequestSerializer(serializers.ModelSerializer):
    user = UserUpdateRequestSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'experience', 'city', 'country']

    def update(self, instance, validated_data):
        user_dict = validated_data.pop('user', None)
        if user_dict:
            user_obj = instance.user
            for key, value in user_dict.items():
                setattr(user_obj, key, value)
            user_obj.save()
            validated_data["user"] = user_obj
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class ProfileResponseSerializer(serializers.ModelSerializer):
    user = UserResponseSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'experience', 'city', 'country']


class ProfilePageResponseSerializer(serializers.ModelSerializer):
    data = ProfileResponseSerializer(many=True)
    pageSize = serializers.IntegerField()
    pageIndex = serializers.IntegerField()
    length = serializers.IntegerField()

    class Meta:
        model = Profile
        fields = ['data', 'pageSize', 'pageIndex', 'length']
