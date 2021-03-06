# Generated by Django 3.2.7 on 2021-11-23 17:46

import datetime
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(blank=True, max_length=255)),
                ('pets_involved', multiselectfield.db.fields.MultiSelectField(choices=[('DOG', 'DOG'), ('CAT', 'CAT'), ('HORSE', 'HORSE'), ('BIRD', 'BIRD'), ('OTHER', 'OTHER'), ('SMALL_PET', 'SMALL_PET')], max_length=34, null=True)),
                ('date', models.DateField(default=datetime.date.today)),
                ('score', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='profiles.profile')),
                ('reviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviewer', to='profiles.profile')),
            ],
        ),
    ]
