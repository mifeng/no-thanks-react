# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-12 22:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('no_thanks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='deck',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
