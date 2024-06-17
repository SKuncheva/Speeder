from django.urls import path, include
from backend.users.views import RegisterUser, LoginUser, UserLogout, ProfileUser, LikeCreate, LikeView, DeleteLikes, \
    CartView, CartProductView, AddProductCreate, UpdateProduct, DeleteProductCart

urlpatterns = [
    path('register', RegisterUser.as_view(), name='register'),
    path('login', LoginUser.as_view(), name="login"),
    path('logout', UserLogout.as_view(), name="logout"),
    path('profile', ProfileUser.as_view(), name="profile"),
    path('like', LikeCreate.as_view(), name='addLikedProduct'),
    path('profile/<int:pk>/like', LikeView.as_view(), name='getLikedProduct'),
    path('profile/like/<int:pk>', DeleteLikes.as_view(), name='deleteLikedProduct'),
    path('cart', CartView.as_view(), name='createCart'),
    path('cart/products', CartProductView.as_view(), name='getAllProductsInCart'),
    path('cart/products/add', AddProductCreate.as_view(), name='addProductsInCart'),
    path('cart/products/update', UpdateProduct.as_view(), name='updateProductsInCart'),
    path('cart/products/remove', DeleteProductCart.as_view(), name='updateProductsInCart'),

]
