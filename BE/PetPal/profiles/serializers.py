from django.db.models import Avg
from rest_framework import serializers
from users.serializers import UserSerializer, UserResponseSerializer, UserUpdateRequestSerializer

from .models import Profile, Contact
from users.models import User

from pet_sitters.models import Sitter

from reviews.models import Review


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['city', 'country', 'whatsapp_number', 'phone_number']


class ReviewsInfoSerializer(serializers.ModelSerializer):
    average = serializers.FloatField(allow_null=True)
    count = serializers.IntegerField(allow_null=True)

    class Meta:
        model = Profile
        fields = ['average', 'count']


class MeResponseSerializer(serializers.ModelSerializer):
    user = UserResponseSerializer(read_only=True)
    is_pet_sitter = serializers.SerializerMethodField('get_is_pet_sitter')
    contact = ContactInfoSerializer()
    reviews = serializers.SerializerMethodField('get_reviews')
    avatar = serializers.SerializerMethodField('get_avatar_href')

    class Meta:
        model = Profile
        fields = ['bio', 'user', 'contact', 'is_pet_sitter', 'reviews', 'avatar']

    def get_avatar_href(self, profile):
        # TODO: replace
        if (profile.image):
            return 'http://localhost:8000' + profile.image.url
        else:
            return None

    def get_is_pet_sitter(self, profile) -> bool:
        if Sitter.objects.filter(profile=profile).count():
            return True
        return False

    def get_reviews(self, profile) -> ReviewsInfoSerializer:
        querySet = Review.objects.filter(profile=profile)
        serializer = ReviewsInfoSerializer({
            'average': querySet.aggregate(avg=Avg('score'))['avg'],
            'count': querySet.count()
        })
        return serializer.data


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

        contact_dict = validated_data.pop('contact', None)
        if contact_dict:
            contact_obj = instance.contact
            for key, value in contact_dict.items():
                setattr(contact_obj, key, value)
            contact_obj.save()
            validated_data["contact"] = contact_obj
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class ProfileResponseSerializer(serializers.ModelSerializer):
    user = UserResponseSerializer()
    avatar = serializers.SerializerMethodField('get_avatar_href')

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'contact', 'avatar']

    def get_avatar_href(self, profile):
        # TODO: replace
        if (profile.image):
            return 'http://localhost:8000' + profile.image.url
        else:
            return None


class ProfilePageResponseSerializer(serializers.ModelSerializer):
    profiles = MeResponseSerializer(many=True)
    pageSize = serializers.IntegerField()
    pagesTotal = serializers.IntegerField()
    pageIndex = serializers.IntegerField()
    length = serializers.IntegerField()

    class Meta:
        model = Profile
        fields = ['profiles', 'pageSize', 'pagesTotal', 'pageIndex', 'length']


class UserAvatarRequestSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = ['image']

    def save(self, *args, **kwargs):
        if self.instance.image:
            self.instance.image.delete()
        return super().save(*args, **kwargs)
