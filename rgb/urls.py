from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('profile/<int:profile_id>/', views.show_profile, name='profile'),
    path('new_profile/', views.new_profile, name='new_profile'),
    path('save_profile/', views.save_profile, name='save_profile'),
    path('update_profile/<int:profile_id>', views.update_profile, name='update_profile'),
    path('activate_profile/<int:profile_id>/', views.activate_profile, name='activate_profile'),
    path('data/', views.request_json, name='data'),
]
