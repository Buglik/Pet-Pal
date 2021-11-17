from rest_framework import serializers

from .models import Sitter


class PetSitterRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sitter
        fields = ['experience', 'pet_experience', 'motivation', 'availability_start_date',
                  'availability_end_date']

    def create(self, validated_data):
        return Sitter.objects.create(**validated_data)
