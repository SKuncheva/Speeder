from django.db import models


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)


class Product(models.Model):
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    category = models.CharField(max_length=50)
    size = models.IntegerField()
    price = models.FloatField()
    stock = models.IntegerField()
    create_product = models.DateTimeField(auto_now_add=True)
    updated_product = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self):
        return f'{self.brand}- {self.model}'
