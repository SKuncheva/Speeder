# Generated by Django 4.2.11 on 2024-04-25 15:24

import backend.speederBackend.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=50)),
                ('model', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('category', models.CharField(max_length=50)),
                ('size', models.IntegerField()),
                ('price', models.FloatField()),
                ('stock', models.IntegerField()),
                ('create_product', models.DateTimeField(auto_now_add=True)),
                ('updated_product', models.DateTimeField(auto_now=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to=backend.speederBackend.models.upload_to)),
            ],
        ),
    ]
