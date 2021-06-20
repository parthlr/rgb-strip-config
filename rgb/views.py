from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse

from .models import Profile
# Create your views here.

def index(request):
    p = Profile.objects.get(active=True)
    return render(request, 'index.html', {'profile': p})

def save_profile(request):
    profile_name = request.POST['profile_name']
    num_leds = 10
    led_rgbs = {}
    for i in range(num_leds):
        current_led = request.POST['led' + str(i)]
        led_rgbs.update({str(i): current_led})

    p = Profile.objects.create(name=profile_name, leds=num_leds, rgb_values=led_rgbs, active=True)
    update_active_profile(p)

    return HttpResponseRedirect(reverse('index'))

def update_active_profile(profile):
    for p in Profile.objects.all().exclude(id=profile.id):
        p.active = False

def request_json(request):
    p = Profile.objects.get(active=True)
    data = [{'num_leds': p.leds, 'rgb_values': p.rgb_values}]

    return JsonResponse(data, safe=False)
