from django.db import models

from profiles.models import Profile


class Pet(models.TextChoices):
    DOG = 'DOG',
    CAT = 'CAT',
    HORSE = 'HORSE',
    BIRD = 'BIRD',
    SMALL_PET = 'SMALL_PET',
    OTHER = 'OTHER'


class Sitter(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    experience = models.CharField(max_length=255, null=True)
    pet_experience = models.CharField(max_length=9, choices=Pet.choices, null=True)
    motivation = models.CharField(max_length=255, null=True)
    availability_start_date = models.DateField()
    availability_end_date = models.DateField()
