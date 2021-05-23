# Generated by Django 3.0.5 on 2021-05-21 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='customer_ward',
        ),
        migrations.AlterField(
            model_name='order',
            name='customer_email',
            field=models.CharField(max_length=256),
        ),
        migrations.AlterField(
            model_name='order',
            name='payment_method',
            field=models.CharField(max_length=256),
        ),
    ]
