from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Employee
from .models import CustomUser


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['username', 'password','age', 'city']



from django.contrib.auth import get_user_model
User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'team', 'balance', 'is_staff']

        def create(self, validate_data):
            user = User.objects.create(username = validate_data["username"],email = validate_data["email"],
                                       
                                       team = validate_data["team"], balance = validate_data["balance"],
                                       is_staff = validate_data["is_staff"])
            user.set_password(validate_data["password"])
            user.save()
            return user


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'team', 'balance', 'is_staff']
        

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
            # validated_data['team'],
            # validated_data['balance'],
            # validated_data['is_staff'],
            
        )
        # user = User.objects.create_user(
        # self.cleaned_data['username'],
        # email=self.cleaned_data['email'],
        # password=self.cleaned_data['password'],
        # team=self.cleaned_data['team'],
        # balance=self.cleaned_data['balance'],
        # is_staff=self.cleaned_data['is_staff'],
        
        
        # )
        return user


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = ['username', 'email','password', 'team', 'balance', 'is_staff', ]

        def create(self, validate_data):
            user = User.objects.create(username = validate_data["username"],email = validate_data["email"],
                                             password = validate_data["password"],
                                       team = validate_data["team"], balance = validate_data["balance"],
                                       is_staff = validate_data["is_staff"])
            
            return user