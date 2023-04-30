from django.db import models

# Create your models here.

class Employee(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    age = models.IntegerField()
    city = models.CharField(max_length=255)
    
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # username = models.CharField(unique=True,max_length=15, blank=True, null=True, editable = True)
    # email = models.EmailField(max_length=15, blank=True, null=True, editable = True)
    # password = models.CharField(max_length=15, blank=True, null=True, editable = True)
    team = models.CharField(max_length=15, blank=True, null=True, editable = True)
    balance = models.IntegerField( blank=True, editable = True, default=0)
    is_staff = models.BooleanField(('staff status'),default=False)


# class CustomAddUser(AbstractUser):
#     team = models.CharField(max_length=15, blank=True, null=True, editable = True)
#     balance = models.IntegerField( blank=True, editable = True, default=0)
#     is_staff = models.BooleanField(('staff status'),default=False)

#     REQUIRED_FIELDS = ['username', 'email', 'team', 'balance' , 'is_staff']
    

#     # def __str__(self):
#     #     return self.email