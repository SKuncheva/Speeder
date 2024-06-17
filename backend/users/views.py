from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from backend.users.serializer import UserRegisterSerializer, LoginSerializer, ProfileUserSerializer, LikeSerializer, \
    CartSerializer, CartProductsSerializer, AddProductCartSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from backend.users.models import Like, Cart, CartProducts
from backend.speederBackend.models import Product

User = get_user_model()


class RegisterUser(APIView):
    @staticmethod
    def post(request, *args, **kargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {
                'user': serializer.data['email'],
                'token': Token.objects.get(user=User.objects.get(email=serializer.data['email'])).key
            }
            return Response(response, status=status.HTTP_200_OK)
        raise ValidationError(
            serializer.errors, code=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):
    @staticmethod
    def post(request, *args, **kargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            response = {
                "message": "User with this email address does not exist!"
            }
            if User.objects.filter(email=request.data['email']).exists():
                user = User.objects.get(email=request.data['email'])
                password = request.data["password"]
                if not user.check_password(password):
                    response = {
                        "message": "Incorrect Password!"
                    }
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)

                token, created = Token.objects.get_or_create(user=user)
                response = {
                    'id': user.id,
                    'user': user.email,
                    'token': token.key
                }

                return Response(response, status=status.HTTP_200_OK)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    @staticmethod
    def post(request, *args):
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({"message": "You have successfully logged out"}, status=status.HTTP_200_OK)


class ProfileUser(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileUserSerializer(self.request.user)
        return Response(serializer.data)


class LikeCreate(CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class LikeView(ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def get_queryset(self, **kwargs):
        query = super().get_queryset()
        user_id = self.kwargs['pk']
        query = query.filter(user_id=user_id)
        return query


class DeleteLikes(DestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def get_queryset(self, *args, **kwargs):
        liked_product = Like.objects.filter(user=self.request.user.id, product_id=self.kwargs['pk'])
        return liked_product

    def delete(self, request, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        raise ValidationError('You never liked')


class CartView(CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class AddProductCreate(CreateAPIView):
    queryset = CartProducts.objects.all()
    serializer_class = AddProductCartSerializer

    def post(self, request, *args, **kwargs):
        user_id = self.request.user.id
        if Cart.objects.filter(user_id=user_id).exists():
            request.data['cart'] = Cart.objects.get(user_id=user_id).id
        else:
            cart = Cart.objects.create(user_id=user_id)
            request.data['cart'] = cart.id
        return self.create(request, *args, **kwargs)


class CartProductView(ListAPIView):
    # cart = Cart.objects.all()
    queryset = CartProducts.objects.all()
    serializer_class = CartProductsSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        cart_id = Cart.objects.filter(user_id=user_id)
        products_in_cart = CartProducts.objects.filter(cart__in=cart_id)
        return products_in_cart


class UpdateProduct(UpdateAPIView):
    queryset = CartProducts.objects.all()
    serializer_class = CartProductsSerializer

    def put(self, request, *args, **kwargs):
        data = request.data
        user_id = self.request.user.id
        cart_id = Cart.objects.get(user_id=user_id).id
        current_product = CartProducts.objects.get(cart_id=cart_id, product_id=request.data['product'])
        if current_product.quantity != data['quantity']:
            current_product.quantity = data['quantity']
            current_product.save()
        # price_product = Product.objects.get(id=request.data['product']).price
        return Response({'product': current_product.product_id, 'quantity': data['quantity']},
                        status=status.HTTP_200_OK)
        # if serializer.is_valid():
        #     serializer.save()
        # return Response(serializer.data)


class DeleteProductCart(DestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartProductsSerializer

    def get_queryset(self):
        queryset = CartProducts.objects.filter(product_id=self.request.data['product'])
        print(queryset)
        return queryset

    def delete(self, request, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'message': 'Error'})
