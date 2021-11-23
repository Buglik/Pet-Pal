# Generated by Django 3.2.7 on 2021-11-17 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pet_sitters', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sitter',
            name='pet_experience',
            field=models.JSONField(choices=[('DOG', 'Dog'), ('CAT', 'Cat'), ('HORSE', 'Horse'), ('BIRD', 'Bird'), ('SMALL_PET', 'Small Pet'), ('OTHER', 'Other')], null=True),
        ),
    ]
