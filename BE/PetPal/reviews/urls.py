from django.urls import path

from .views import ReviewView, GetReviewsPaginatedView

urlpatterns = [
    path('', ReviewView.as_view()),
    path('paginated', GetReviewsPaginatedView.as_view())
]
