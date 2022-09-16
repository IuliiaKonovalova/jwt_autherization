from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib.auth import get_user_model
User = get_user_model()
from .serializers import UserCreateSerializer, UserSerializer


class RegisterView(APIView):
    """Register a new user"""
    def post(self, request):
        """Create a new user with a given email and password"""

        # get data from the request (serializer)
        data = request.data
        # use the serializer to validate the data
        serializer =  UserCreateSerializer(data=data)

        # Check if the data is valid
        if not serializer.is_valid():
            # if not valid return the errors and a bad request status
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        # if valid create the user
        user = serializer.create(serializer.validated_data)

        # return the user data and a success status
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    """Retrieve a user"""
    # Setting the permission class to IsAuthenticated will make sure that
    # the user is authenticated before they can access this view.
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        """Retrieve a user"""

        # get the user from the request
        user = request.user

        # serialize the user
        user = UserSerializer(user)

        # return the user data and a success status
        return Response(user.data, status=status.HTTP_200_OK)
