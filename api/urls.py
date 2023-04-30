from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name="registration"),
    path('register_user/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('employees/', views.EmployeeList.as_view(), name="Employee-list"),
    path('postemployee/', views.EmployeeCreate.as_view(), name="Post-employee"),
    path('updateemployee/<int:pk>/',
         views.EmployeeUpdate.as_view(), name="Update-employee"),
    path('singleuser/<int:pk>/', views.GetSingleUser.as_view(), name="singleuser"),
    # path('register-user/', views.register_user, name = "registration"),
    path('', views.user_login, name="login"),
    path('signup/', views.user_registration, name="signup"),
    path('user_homepage/', views.user_home, name="user-homepage"),
    path('admin_homepage/', views.admin_home, name="admin-homepage"),
    path('example/', views.ExampleView.as_view()),
    # URLs for User
    path('userlist/', views.UserList.as_view()),
    path('userupdate/<int:pk>/', views.UserUpdate.as_view()),
    path('userdelete/<int:pk>/', views.DeleteUser.as_view()),
    # path('adduser/', views.AddUserView.as_view())
    # path('aaa', views.LoginPageView.as_view(), name="login")

]
