from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import views, status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated

from .models import Review
from .serializers import ReviewRequestSerializer, ReviewPageResponseSerializer
from users.tokens import decode_access_token

from users.models import User


class ReviewView(views.APIView):
    permission_classes = (IsAuthenticated,)

    @extend_schema(
        parameters=[OpenApiParameter(name='username', description='Users nickname', type=str,
                                     location=OpenApiParameter.QUERY),
                    ])
    @extend_schema(
        request=ReviewRequestSerializer,
        responses={201: None},
    )
    def post(self, request):
        token = request.headers['Authorization']
        token = "".join(token.split()[1])
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            reviewer = decode_access_token(token)
        except:
            raise AuthenticationFailed('Unauthenticated!')

        username = request.GET.get('username', None)

        if not username:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            user = User.objects.get(username=username)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if user.profile == reviewer.profile:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if Review.objects.filter(profile=user.profile, reviewer=reviewer.profile).count():
            return Response(status=status.HTTP_403_FORBIDDEN)

        data = request.data
        serializer = ReviewRequestSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(reviewer=reviewer.profile, profile=user.profile)
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class GetReviewsPaginatedView(views.APIView):
    @extend_schema(
        parameters=[OpenApiParameter(name='page', description='Page index', type=int,
                                     location=OpenApiParameter.QUERY),
                    OpenApiParameter(name='size', description='Page size', type=int,
                                     location=OpenApiParameter.QUERY),
                    OpenApiParameter(name='username', description='Users nickname', type=str,
                                     location=OpenApiParameter.QUERY),
                    ])
    @extend_schema(
        responses={200: ReviewPageResponseSerializer},
    )
    def get(self, request):
        username = request.GET.get('username', None)

        if not username:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            user = User.objects.get(username=username)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        page_index = request.GET.get('page', 1)
        page_size = request.GET.get('size', 10)
        queryset = Review.objects.filter(profile=user.profile)
        paginator = Paginator(queryset, page_size)

        try:
            page = paginator.page(page_index)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            page = paginator.page(1)
        except EmptyPage:
            # If page is out of range, deliver last page of results.
            page = paginator.page(paginator.num_pages)

        response = {'reviews': page.object_list,
                    'pageSize': paginator.per_page,
                    'pageIndex': page.number,
                    'pagesTotal': paginator.num_pages,
                    'length': paginator.count}

        serializer = ReviewPageResponseSerializer(response)

        return Response(serializer.data, status=status.HTTP_200_OK)
