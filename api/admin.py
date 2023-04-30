from django.contrib import admin
from .models import Employee, CustomUser

# Register your models here.
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['id','username', 'password','age', 'city']

    
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id','username', 'email', 'team', 'balance', 'is_staff']

    
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(CustomUser,CustomUserAdmin)