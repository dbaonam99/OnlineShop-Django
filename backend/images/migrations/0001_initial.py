# Generated by Django 3.0.5 on 2021-05-21 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.ImageField(blank=True, upload_to='products/%Y/%m/%d')),
            ],
        ),
    ]
