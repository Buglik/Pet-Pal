from drf_spectacular.utils import extend_schema, OpenApiParameter
import jwt
from rest_framework import views, status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import RegisterRequestSerializer, LoginResponseSerializer, LoginRequestSerializer, \
    LogoutRequestSerializer, UserSerializer
from .tokens import generate_activation_token, decode_activation_token, decode_access_token
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
        # current_site = get_current_site(request).domain
        current_site = 'localhost:4200'
        relativeLink = '/auth/verify'
        absurl = 'http://' + current_site + relativeLink + "?token=" + str(token)

        Util.sent_activation_email(absurl, user)

        return Response(status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):

    @extend_schema(
        parameters=[OpenApiParameter(name='token', description='Activation token', required=True, type=str,
                                     location=OpenApiParameter.QUERY)])
    def get(self, request):
        token = request.GET.get('token')
        try:
            user = decode_activation_token(token)
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({'status': 'Successfully activated'}, status=status.HTTP_200_OK)
            else:
                return Response({'globalError': 'User already verified'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'globalError': 'Activation token has expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'globalError': 'Activation token invalid'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    permission_classes = []

    @extend_schema(
        request=LoginRequestSerializer,
        responses={200: LoginResponseSerializer},
    )
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
        except:
            raise AuthenticationFailed({'globalError': ['error.credentials.not_provided']})

        try:
            user = User.objects.get(email=email)
        except:
            raise AuthenticationFailed({'globalError': ['error.credentials.invalid']})

        if not user.check_password(password):
            raise AuthenticationFailed({'globalError': ['error.credentials.invalid']})

        token = RefreshToken.for_user(user)

        serializer = LoginResponseSerializer(data={
            'refresh': str(token),
            'access': str(token.access_token)
        })
        serializer.is_valid()

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserView(views.APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={200: UserSerializer},
    )
    def get(self, request):
        token = request.headers['Authorization']
        token = "".join(token.split()[1])
        if not token:
            raise AuthenticationFailed({'globalError': ['error.credentials.not_provided']})

        serializer = decode_access_token(token)

        return Response(serializer.data)


class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=LogoutRequestSerializer,
        responses={204: None},
    )
    def post(self, request):
        try:
            token = request.data['refresh']
            RefreshToken(token).blacklist()
        except:
            raise Exception('Blacklisting failed')

        token = request.headers['Authorization']
        token = "".join(token.split()[1])
        if not token:
            raise AuthenticationFailed({'globalError': 'error.credentials.not_provided'})

        return Response(status=status.HTTP_204_NO_CONTENT)
