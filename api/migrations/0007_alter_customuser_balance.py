# Generated by Django 4.1.6 on 2023-02-22 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_customuser_is_staff'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='balance',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
