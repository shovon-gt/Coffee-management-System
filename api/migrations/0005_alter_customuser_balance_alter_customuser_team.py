# Generated by Django 4.1.6 on 2023-02-06 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_customuser_balance_alter_customuser_team'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='balance',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='team',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
