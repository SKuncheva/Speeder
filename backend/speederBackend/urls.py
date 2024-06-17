from django.urls import path, include

from backend.speederBackend.views import GetAllProductsView, GetProductByIdView, CategoryViews

urlpatterns = [
    path('', include([
        path('', include([
            path('', GetAllProductsView.as_view(), name='allProduct'),
            path('<int:id>/', GetProductByIdView.as_view(), name='getProductById'),
            path('all=<category>', CategoryViews.as_view(), name='categoryProduct'),
        ])),
    ]))]
