import datetime

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

# Create your models here.
from profiles.models import Profile
from multiselectfield import MultiSelectField

from pet_sitters.models import Pets


class Review(models.Model):
    reviewer = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='reviewer')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile')
    description = models.CharField(blank=True, max_length=255)
    pets_involved = MultiSelectField(choices=Pets, null=True)
    date = models.DateField(default=datetime.date.today)
    score = models.IntegerField(default=0,
                                validators=[
                                    MinValueValidator(1),
                                    MaxValueValidator(5)
                                ])
