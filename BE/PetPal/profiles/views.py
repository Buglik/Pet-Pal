from django.shortcuts import render
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiParameter

from .models import Profile
from .serializers import MeResponseSerializer, ProfileRequestSerializer
from users.tokens import decode_access_token


class MyProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={200: MeResponseSerializer},
    )
    def get(self, request):
        token = request.headers['Authorization']
        token = "".join(token.split()[1])
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        user = decode_access_token(token)

        serializer = MeResponseSerializer(user.profile)
        return Response(
            serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=ProfileRequestSerializer,
        responses={201: None},
    )
    def put(self, request):
        token = request.headers['Authorization']
        token = "".join(token.split()[1])
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        user = decode_access_token(token)
        data = request.data

        serializer = ProfileRequestSerializer(instance=user.profile, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)
