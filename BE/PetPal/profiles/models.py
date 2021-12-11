from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='user_avatars', null=True, blank=True)
    bio = models.CharField(max_length=255, null=True, blank=True)

    # TODO: move profile pic to profile
    def __str__(self):
        return self.user.username

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class Contact(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True)
    city = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    whatsapp_number = PhoneNumberField(blank=True, null=True)
    phone_number = PhoneNumberField(blank=True, null=True)

    @receiver(post_save, sender=Profile)
    def create_profile_contact(sender, instance, created, **kwargs):
        if created:
            Contact.objects.create(profile=instance)

    @receiver(post_save, sender=Profile)
    def save_profile_contact(sender, instance, **kwargs):
        instance.contact.save()
