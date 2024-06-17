from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from backend.speederBackend.serializer import ProductSerializer
from backend.users.models import Like, Cart, CartProducts

User = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "password2"]
        extra_kwargs = {
            'password': {"write_only": True}
        }

    def validate(self, instance):
        if User.objects.filter(email=instance['email']).exists():
            raise ValidationError({"message": "The email already exists!"})
        return instance

    def create(self, validated_data):
        passowrd = validated_data.pop('password')
        passowrd2 = validated_data.pop('password2')
        user = User.objects.create(**validated_data)
        user.set_password(passowrd)
        user.save()
        Token.objects.create(user=user)
        return user


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "password"]


class ProfileUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email"]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'product', 'created']

    def create(self, validated_data):
        user = validated_data['user'].id
        product = validated_data['product'].id
        if Like.objects.filter(product_id=product, user_id=user).exists():
            raise ValidationError({"message": "Тhe product is already liked!"})
        return Like.objects.create(**validated_data)

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = ProfileUserSerializer(instance.user).data
        response['product_likes'] = ProductSerializer(instance.product).data
        return response


class CartProductsSerializer(serializers.ModelSerializer):
    total_price_product = serializers.SerializerMethodField(method_name='total_price')
    product = ProductSerializer(many=False)

    class Meta:
        model = CartProducts
        fields = ['cart', 'product', 'quantity', 'total_price_product']

    @staticmethod
    def total_price(product):
        total_price = product.quantity * product.product.price
        return total_price


class CartSerializer(serializers.ModelSerializer):
    # product = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created', 'product']


class AddProductCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProducts
        fields = ['cart', 'product', 'quantity']

    def create(self, validated_data):
        cart = validated_data['cart'].id
        product = validated_data['product'].id
        if CartProducts.objects.filter(product_id=product, cart=cart).exists():
            raise ValidationError({"message": "Тhe product is already in cart!"})
        return CartProducts.objects.create(**validated_data)
