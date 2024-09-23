# Generated by Django 3.2.5 on 2024-02-26 16:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score_player1', models.IntegerField()),
                ('score_player2', models.IntegerField()),
                ('date_played', models.DateTimeField(auto_now_add=True)),
                ('game_mode', models.CharField(choices=[('local', 'Local'), ('online', 'Online')], max_length=20)),
                ('player1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='matches_player1', to=settings.AUTH_USER_MODEL)),
                ('player2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='matches_player2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]