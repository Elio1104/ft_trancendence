# Generated by Django 3.2.5 on 2024-02-25 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0002_customuser_language'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile',
            field=models.ImageField(blank=True, null=True, upload_to='profile_images/'),
        ),
    ]