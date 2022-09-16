from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class UserAccountManager(BaseUserManager):
    """Manager for user accounts"""
    def create_user(self, first_name, last_name, email, password=None):
        """Create a new user account"""
        if not email:
            raise ValueError("Users must have an email address")

        # control ending of the email address
        # EMAIL@MAIL.COM -> EMAIL@mail.com
        email=self.normalize_email(email)

        # to control the email address format
        # EMAIL@mail.com -> email@mail.com
        email = email.lower()
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, password=None):
        """Create and save a new superuser with given details"""
        user = self.create_user(
            first_name,
            last_name,
            email,
            password=password,
        )
        # is_staff and is_superuser
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
