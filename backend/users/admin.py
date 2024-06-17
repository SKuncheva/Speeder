from django.contrib import admin

from backend.users.models import User, Like, Cart, CartProducts


# Register your models here.
@admin.register(User)
class UserModelAdmin(admin.ModelAdmin):
    model = User
    list_display = ['id', 'email']


@admin.register(Like)
class WishListModelAdmin(admin.ModelAdmin):
    model = Like
    list_display = ['id', 'user', 'product', 'created']


@admin.register(Cart)
class CartModelAdmin(admin.ModelAdmin):
    model = Cart
    list_display = ['id', 'user', 'created']


@admin.register(CartProducts)
class CartProductsModelAdmin(admin.ModelAdmin):
    model = CartProducts
    list_display = ['id', 'cart', 'product', 'quantity']
