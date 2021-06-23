from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('profile/<int:profile_id>/', views.show_profile, name='profile'),
    path('save_profile/', views.save_profile, name='save_profile'),
    path('data/', views.request_json, name='data'),
]
