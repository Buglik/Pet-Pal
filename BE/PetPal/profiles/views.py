from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import views, status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.tokens import decode_access_token

from .models import Profile
from .serializers import MeResponseSerializer, ProfileRequestSerializer, \
    ProfileResponseSerializer, ProfilePageResponseSerializer


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


class ProfilesView(ListAPIView):
    @extend_schema(
        parameters=[OpenApiParameter(name='page', description='Page index', type=int,
                                     location=OpenApiParameter.QUERY),
                    OpenApiParameter(name='size', description='Page size', type=int,
                                     location=OpenApiParameter.QUERY)
                    ])
    @extend_schema(
        request=None,
        responses={200: ProfilePageResponseSerializer},
    )
    def get(self, request):
        page_index = request.GET.get('page', 1)
        page_size = request.GET.get('size', 10)
        queryset = Profile.objects.all()
        paginator = Paginator(queryset, page_size)

        try:
            page = paginator.page(page_index)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            page = paginator.page(1)
        except EmptyPage:
            # If page is out of range, deliver last page of results.
            page = paginator.page(paginator.num_pages)

        serializer = ProfileResponseSerializer(page.object_list, many=True)

        response = {'data': serializer.data,
                    'pageSize': paginator.per_page,
                    'pageIndex': page.number,
                    'length': paginator.count}

        return Response(response, status=status.HTTP_200_OK)
