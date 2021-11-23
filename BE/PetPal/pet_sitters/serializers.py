from rest_framework import serializers, fields

from .models import Sitter, Pets
from profiles.serializers import MeResponseSerializer


class PetSitterRequestSerializer(serializers.ModelSerializer):
    pet_experience = fields.MultipleChoiceField(choices=Pets)

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


class PetSitterResponseSerializer(serializers.ModelSerializer):
    profile = MeResponseSerializer()
    pet_experience = fields.MultipleChoiceField(choices=Pets)

    class Meta:
        model = Sitter
        fields = ['profile', 'experience', 'pet_experience', 'motivation', 'availability_start_date',
                  'availability_end_date']


class PetSitterPageResponseSerializer(serializers.ModelSerializer):
    sitters = PetSitterResponseSerializer(many=True)
    pageSize = serializers.IntegerField()
    pagesTotal = serializers.IntegerField()
    pageIndex = serializers.IntegerField()
    length = serializers.IntegerField()

    class Meta:
        model = Sitter
        fields = ['sitters', 'pageSize', 'pagesTotal', 'pageIndex', 'length']
