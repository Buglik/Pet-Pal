from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from rest_framework import views, status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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

        if user.profile.is_pet_sitter:
            # TODO: secure multiple creations
            pass

        data = request.data

        serializer = PetSitterRequestSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(profile=user.profile)
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)
