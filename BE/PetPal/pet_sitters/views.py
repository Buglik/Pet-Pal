from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Q
from django.shortcuts import render
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import views, status
from rest_framework.decorators import authentication_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Sitter
from .serializers import PetSitterRequestSerializer, PetSitterResponseSerializer, PetSitterPageResponseSerializer
from users.tokens import decode_access_token

from users.models import User


class PetSittersView(views.APIView):
    permission_classes = (IsAuthenticated,)

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


class GetPetSitterView(views.APIView):
    @extend_schema(
        parameters=[OpenApiParameter(name='username', description='Users nickname', type=str,
                                     location=OpenApiParameter.QUERY),
                    ])
    @extend_schema(
        responses={200: PetSitterResponseSerializer},
    )
    def get(self, request):
        username = request.GET.get('username', None)

        if not username:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            user = User.objects.get(username=username)
            sitter = Sitter.objects.get(profile=user.profile)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = PetSitterResponseSerializer(user.profile.sitter)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GetPetSittersPaginatedView(views.APIView):
    @extend_schema(
        parameters=[OpenApiParameter(name='page', description='Page index', type=OpenApiTypes.INT,
                                     location=OpenApiParameter.QUERY),
                    OpenApiParameter(name='size', description='Page size', type=OpenApiTypes.INT,
                                     location=OpenApiParameter.QUERY),
                    OpenApiParameter(name='address', description='Address query', type=OpenApiTypes.STR,
                                     location=OpenApiParameter.QUERY),
                    OpenApiParameter(name='startDate', description='Start date query', type=OpenApiTypes.DATE,
                                     location=OpenApiParameter.QUERY),
                    OpenApiParameter(name='endDate', description='End date query', type=OpenApiTypes.DATE,
                                     location=OpenApiParameter.QUERY)
                    ])
    @extend_schema(
        responses={200: PetSitterPageResponseSerializer},
    )
    def get(self, request):
        page_index = request.GET.get('page', 1)
        page_size = request.GET.get('size', 10)
        address_query = request.GET.get('address', None)
        start_date = request.GET.get('startDate', None)
        end_date = request.GET.get('endDate', None)

        queryset = Sitter.objects.all()

        if address_query:
            for term in address_query.split():
                queryset = queryset.filter(
                    Q(profile__contact__city__icontains=term) | Q(profile__contact__country__icontains=term))

        if start_date:
            if end_date:
                queryset = queryset.filter(availability_start_date__lte=start_date, availability_end_date__gte=end_date)
            else:
                queryset = queryset.filter(availability_start_date__lte=start_date, availability_end_date__gte=start_date)

        paginator = Paginator(queryset, page_size)

        try:
            page = paginator.page(page_index)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)

        response = {'sitters': page.object_list,
                    'pageSize': paginator.per_page,
                    'pageIndex': page.number,
                    'pagesTotal': paginator.num_pages,
                    'length': paginator.count}

        serializer = PetSitterPageResponseSerializer(response)

        return Response(serializer.data, status=status.HTTP_200_OK)
