from rest_framework import serializers
from users.serializers import UserSerializer, UserResponseSerializer, UserUpdateRequestSerializer

from .models import Profile, ContactInfo
from users.models import User


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['city', 'country', 'whatsapp_number', 'phone_number']


class MeResponseSerializer(serializers.ModelSerializer):
    user = UserResponseSerializer(read_only=True)
    contact = ContactInfoSerializer()

    class Meta:
        model = Profile
        fields = ['bio', 'user', 'contact', 'is_pet_sitter']


class ProfileRequestSerializer(serializers.ModelSerializer):
    user = UserUpdateRequestSerializer()
    contact = ContactInfoSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'contact']

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
        fields = ['user', 'bio', 'contact']


class ProfilePageResponseSerializer(serializers.ModelSerializer):
    data = ProfileResponseSerializer(many=True)
    pageSize = serializers.IntegerField()
    pageIndex = serializers.IntegerField()
    length = serializers.IntegerField()

    class Meta:
        model = Profile
        fields = ['data', 'pageSize', 'pageIndex', 'length']


class UserAvatarRequestSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['image']

    def save(self, *args, **kwargs):
        if self.instance.image:
            self.instance.image.delete()
        return super().save(*args, **kwargs)
