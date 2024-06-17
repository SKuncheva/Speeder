from django.contrib import admin

from backend.speederBackend.models import Product


# Register your models here.
@admin.register(Product)
class Product(admin.ModelAdmin):
    model = Product
    list_display = ["brand", "model", "size", "price", "category", "create_product"]


