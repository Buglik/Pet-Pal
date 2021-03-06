from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from rest_framework import views, status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import ListAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.tokens import decode_access_token

from .models import Profile
from .serializers import MeResponseSerializer, ProfileRequestSerializer, \
    ProfileResponseSerializer, ProfilePageResponseSerializer, UserAvatarRequestSerializer
from users.models import User


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


class GetProfileByUsernameView(views.APIView):
    @extend_schema(
        parameters=[OpenApiParameter(name='username', description='Users nickname', type=str,
                                     location=OpenApiParameter.QUERY),
                    ])
    @extend_schema(
        responses={200: MeResponseSerializer},
    )
    def get(self, request):
        username = request.GET.get('username', None)

        if not username:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            user = User.objects.get(username=username)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = MeResponseSerializer(user.profile)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfilesView(views.APIView):
    @extend_schema(
        parameters=[OpenApiParameter(name='page', description='Page index', type=int,
                                     location=OpenApiParameter.QUERY),
                    OpenApiParameter(name='size', description='Page size', type=int,
                                     location=OpenApiParameter.QUERY)
                    ])
    @extend_schema(
        responses={200: ProfilePageResponseSerializer},
    )
    def get(self, request):
        page_index = request.GET.get('page', 1)
        page_size = request.GET.get('size', 10)
        queryset = Profile.objects.all().order_by('user__last_name', 'user__first_name')
        paginator = Paginator(queryset, page_size)

        try:
            page = paginator.page(page_index)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            page = paginator.page(1)
        except EmptyPage:
            # If page is out of range, deliver last page of results.
            page = paginator.page(paginator.num_pages)

        response = {'profiles': page.object_list,
                    'pageSize': paginator.per_page,
                    'pageIndex': page.number,
                    'pagesTotal': paginator.num_pages,
                    'length': paginator.count}

        serializer = ProfilePageResponseSerializer(response)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileAvatarView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request={
            "multipart/form-data": {
                'type': 'object',
                'properties': {
                    "image": {
                        'type': "string",
                        'format': "binary",
                    }}
            }
        },
        responses={200: None}, )
    def put(self, request):
        token = request.headers['Authorization']
        token = "".join(token.split()[1])
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            user = decode_access_token(token)
        except:
            raise AuthenticationFailed('Unauthenticated!')

        image = request.data
        serializer = UserAvatarRequestSerializer(instance=user.profile, data=image)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_200_OK)
