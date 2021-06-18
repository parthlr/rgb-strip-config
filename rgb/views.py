from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
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

    Profile.objects.create(name=profile_name, leds=num_leds, rgb_values=led_rgbs, activte=True)
    return HttpResponseRedirect(reverse('index'))

def request_json(request):
    p = Profile.objects.get(active=True)

    data = [{'num_leds': p.leds}]
    led_values = {}
    index = 0
    for i in range(p.leds):
        current_hex = p.rgb_values[index:index + 7]
        led_values.update({str(i): current_hex})
        index += 7
    data.append({'rgb_values': led_values})

    return JsonResponse(data, safe=False)
