# Generated by Django 3.2.7 on 2021-11-17 18:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0003_auto_20211117_1808'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sitter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('experience', models.CharField(max_length=255, null=True)),
                ('pet_experience', models.CharField(choices=[('DOG', 'Dog'), ('CAT', 'Cat'), ('HORSE', 'Horse'), ('BIRD', 'Bird'), ('SMALL_PET', 'Small Pet'), ('OTHER', 'Other')], max_length=9, null=True)),
                ('motivation', models.CharField(max_length=255, null=True)),
                ('availability_start_date', models.DateField()),
                ('availability_end_date', models.DateField()),
                ('profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='profiles.profile')),
            ],
        ),
    ]