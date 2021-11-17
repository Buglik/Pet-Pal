from django.db import models

from profiles.models import Profile
from multiselectfield import MultiSelectField

Pets = (('DOG', 'DOG'),
        ('CAT', 'CAT'),
        ('HORSE', 'HORSE'),
        ('BIRD', 'BIRD'),
        ('OTHER', 'OTHER'),
        ('SMALL_PET', 'SMALL_PET'))


class Sitter(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    experience = models.CharField(max_length=255, null=True)
    pet_experience = MultiSelectField(choices=Pets, null=True)
    motivation = models.CharField(max_length=255, null=True)
    availability_start_date = models.DateField()
    availability_end_date = models.DateField()
