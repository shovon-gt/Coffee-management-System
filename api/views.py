from .models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.shortcuts import render
from rest_framework.views import APIView
from django.views.generic import View
from rest_framework.response import Response
from rest_framework import status
from .models import Employee, CustomUser
from .serializers import EmployeeSerializer, CustomUserSerializer
from django.http import Http404
from .forms import NewUserform
from django.contrib import messages
from django.shortcuts import redirect
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics
from .serializers import RegisterSerializer, UserSerializer


class RegisterUser(generics.CreateAPIView):
    # def post(self, request):
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response({'message': 'You are not an authenticated user.'}, serializer.data, status=status.HTTP_201_CREATED)
    serializer_class = RegisterSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    print('test',serializer_class)


# class AddUserView(generics.CreateAPIView):
#     def post(self, request, *args, **kwargs):
#         # try:
#         username = request.data.get('username')
#         email = request.data.get('email')
#         team = request.data.get('team')
#         balance = request.data.get("balance")
#         is_staff = request.data.get("is_staff")
#         print(username,email,team,balance,is_staff)
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response({'message': 'You are not an authenticated user.'}, serializer.data, status=status.HTTP_201_CREATED)
        # except(error):
        #    return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)
class LoginView(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # id = request.data.get('id')
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            # id = 0
            id1 = CustomUser.objects.get(username=username)
            print(id1.id)

            user = authenticate(username=username, password=password)
            if user != None and user.is_staff and user.check_password(password):
                if user:

                    return Response({
                        'message': 'Welcome as admin.',
                        "data": {
                            "id": id1.id,
                            "username": username,
                            "role": "admin"
                        }


                    })

                else:
                    return Response({'error': 'You are not an authenticated user.'}, status=status.HTTP_400_BAD_REQUEST)
            elif user != None and not user.is_staff and user.check_password(password):
                if user:

                    return Response({
                        'message': 'Welcome as user.',
                        "data": {
                            "id": id1.id,
                            "username": username,
                            "role": "user"
                        }
                    })

                else:
                    return Response({'error': 'You are not an authenticated user.'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'error': 'You are not an authenticated user.'}, status=status.HTTP_400_BAD_REQUEST)
        
        except:
           return Response({'error': 'You are not an user.'}, status=status.HTTP_400_BAD_REQUEST)

        
def register_user(request):
    if request.method == "POST":
        form = NewUserform(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration Successful.")
            return redirect('login')
        messages.error(
            request, "Unsuccessful registration. Invalid information"
        )
    form = NewUserform()
    return render(request=request, template_name='api/registration.html', context={"form": form})


def user_login(request):
    return render(request=request, template_name="api/login_page/login.html")


def user_registration(request):
    return render(request=request, template_name="api/registration_page/registration.html")


def user_home(request):
    return render(request=request, template_name="api/user_homepage/user_home.html")

def admin_home(request):
    return render(request=request, template_name="api/admin_homepage/admin_home.html")

class EmployeeList(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        employee = Employee.objects.all()
        serializer = EmployeeSerializer(employee, many=True)
        return Response({
            "message": "All the employee is here.",
            "data": {
                "data": serializer.data
            }
        })


class EmployeeCreate(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Employee Created.",
                "data": {
                    "data": serializer.data
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeUpdate(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAdminUser]
    def get_object(self, pk):
        try:
            return Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = EmployeeSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Data Updated.",
                "data": {
                    "data": serializer.data
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

from rest_framework.pagination import PageNumberPagination
class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class UserList(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get(self, request, format=None):

        user = CustomUser.objects.all()
        serializer = CustomUserSerializer(user, many=True)
        return Response({
            "message": "All the User is here",
            "data": {
                "data": serializer.data
            }
        })


class UserUpdate(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAdminUser]
    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CustomUserSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Data Updated.",
                "data": {
                    "data": serializer.data
                }
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetSingleUser(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAdminUser]
    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CustomUserSerializer(snippet)
        return Response(serializer.data)


class DeleteUser(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAdminUser]
    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class LoginPageView(View):
    template_name = "api/login_page/login.html"


class RegistrationPageView(View):
    template_name = "api/login_page/registration.html"