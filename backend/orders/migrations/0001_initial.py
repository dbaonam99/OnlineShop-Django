# Generated by Django 3.0.5 on 2021-05-08 16:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=256)),
                ('customer_email', models.EmailField(max_length=256)),
                ('customer_phone', models.CharField(max_length=15)),
                ('customer_province', models.CharField(max_length=256)),
                ('customer_district', models.CharField(max_length=256)),
                ('customer_ward', models.CharField(max_length=256)),
                ('customer_address', models.CharField(max_length=256)),
                ('total_amount', models.IntegerField()),
                ('payment_method', models.CharField(choices=[('BANKING', 'Banking'), ('CASH', 'Cash')], max_length=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('creator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders_creator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderLine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lines', to='orders.Order')),
                ('product', models.ManyToManyField(related_name='lines', to='products.Product')),
            ],
        ),
    ]
