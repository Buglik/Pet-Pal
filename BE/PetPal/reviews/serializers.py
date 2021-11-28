from rest_framework import serializers, fields

from .models import Review
from pet_sitters.models import Pets

from profiles.serializers import MeResponseSerializer


class ReviewRequestSerializer(serializers.ModelSerializer):
    pets_involved = fields.MultipleChoiceField(choices=Pets)

    class Meta:
        model = Review
        fields = ['pets_involved', 'score', 'description']

    def create(self, validated_data):
        return Review.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class ReviewResponseSerializer(serializers.ModelSerializer):
    reviewer = MeResponseSerializer()
    pets_involved = fields.MultipleChoiceField(choices=Pets)

    class Meta:
        model = Review
        fields = ['reviewer', 'pets_involved', 'score', 'description', 'date']


class ReviewPageResponseSerializer(serializers.ModelSerializer):
    reviews = ReviewResponseSerializer(many=True)
    pageSize = serializers.IntegerField()
    pagesTotal = serializers.IntegerField()
    pageIndex = serializers.IntegerField()
    length = serializers.IntegerField()

    class Meta:
        model = Review
        fields = ['reviews', 'pageSize', 'pagesTotal', 'pageIndex', 'length']
