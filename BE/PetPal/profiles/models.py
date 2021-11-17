from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField


class ContactInfo(models.Model):
    city = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    whatsapp_number = PhoneNumberField(blank=True, null=True)
    phone_number = PhoneNumberField(blank=True, null=True)


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.CharField(max_length=255, null=True, blank=True)
    is_pet_sitter = models.BooleanField(default=False)
    # is_pet_owner = models.BooleanField(default=False)
    contact = models.OneToOneField(ContactInfo, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.user.username

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()
