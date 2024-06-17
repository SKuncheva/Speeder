from django_filters import rest_framework as filters

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .models import Product
from .serializer import ProductSerializer
from rest_framework.parsers import MultiPartParser, FormParser


class GetAllProductsView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    @staticmethod
    def get(request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class GetProductByIdView(ListAPIView):
    serializer_class = ProductSerializer


    def get_queryset(self, **kwargs):
        id_product = self.kwargs['id']
        return Product.objects.filter(id=id_product)


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['category', 'brand', 'size']


class CategoryViews(ListAPIView):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter
