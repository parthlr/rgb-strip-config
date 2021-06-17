from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from .models import Profile
# Create your views here.

def index(request):
    return render(request, 'index.html', {'leds': range(10)})

def save_profile(request):
    profile_name = request.POST['profile_name']
    num_leds = 10
    led_rgbs = ''
    for i in range(num_leds):
        current_led = request.POST['led' + str(i)]
        led_rgbs += current_led

    Profile.objects.create(name=profile_name, leds=num_leds, rgb_values=led_rgbs)
    return HttpResponseRedirect(reverse('index'))
