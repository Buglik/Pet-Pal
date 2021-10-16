from django.contrib.sites.shortcuts import get_current_site
from drf_spectacular.utils import extend_schema
from rest_framework import views, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import RegisterRequestSerializer
from .tokens import generate_activation_token
from .utils import Util


class Register(views.APIView):

    @extend_schema(
        request=RegisterRequestSerializer,
        responses={201: 'OK'},
    )
    def post(self, request):
        data = request.data
        serializer = RegisterRequestSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])
        token = generate_activation_token(user)
        current_site = get_current_site(request).domain
        relativeLink = '/auth/verify'
        absurl = 'http://' + current_site + relativeLink + "?token=" + str(token)

        Util.sent_activation_email(absurl, user)

        return Response({'status': 'User created, confirm email'}, status=status.HTTP_201_CREATED)
