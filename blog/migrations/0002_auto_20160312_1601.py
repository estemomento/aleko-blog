# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-12 16:01
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blogpost',
            old_name='timestamp',
            new_name='create_date',
        ),
        migrations.AddField(
            model_name='blogpost',
            name='author',
            field=models.CharField(default='anonymous', editable=False, max_length=128),
        ),
        migrations.AddField(
            model_name='blogpost',
            name='modify_date',
            field=models.DateTimeField(auto_now=True, default=datetime.datetime(2016, 3, 12, 16, 1, 57, 269087, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
