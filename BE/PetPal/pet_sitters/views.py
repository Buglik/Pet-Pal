from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from rest_framework import views, status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Sitter
from .serializers import PetSitterRequestSerializer
from users.tokens import decode_access_token


class PetSittersView(views.APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=PetSitterRequestSerializer,
        responses={201: None},
    )
    def post(self, request):
        token = request.headers['Authorization']
        token = "".join(token.split()[1])
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            user = decode_access_token(token)
        except:
            raise AuthenticationFailed('Unauthenticated!')

        if Sitter.objects.filter(profile=user.profile).count():
            return Response(status=status.HTTP_403_FORBIDDEN)

        data = request.data

        serializer = PetSitterRequestSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(profile=user.profile)
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        request=PetSitterRequestSerializer,
        responses={200: None},
    )
    def put(self, request):
        token = request.headers['Authorization']
        token = "".join(token.split()[1])
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            user = decode_access_token(token)
        except:
            raise AuthenticationFailed('Unauthenticated!')
        sitter = Sitter.objects.filter(profile=user.profile).first()
        if not sitter:
            return Response(status=status.HTTP_403_FORBIDDEN)

        data = request.data

        serializer = PetSitterRequestSerializer(instance=sitter, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_200_OK)
