from rest_framework import serializers

from .models import Sitter
from profiles.serializers import MeResponseSerializer


class PetSitterRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sitter
        fields = ['experience', 'pet_experience', 'motivation', 'availability_start_date',
                  'availability_end_date']

    def create(self, validated_data):
        return Sitter.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


# class PetSitterResponseSerializer(serializers.ModelSerializer):
#     profile = MeResponseSerializer()
#
#     class Meta:
#         model = Sitter
#         fields = ['profile', 'experience', ' pet_experience', 'motivation', 'availability_start_date',
#                   'availability_end_date']
