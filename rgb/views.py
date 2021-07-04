from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse

from .models import Profile
# Create your views here.

def index(request):
    return render(request, 'index.html', {'profiles': Profile.objects.order_by('-active')})

def show_profile(request, profile_id):
    profile = get_object_or_404(Profile, id=profile_id)
    return render(request, 'profile.html', {'profile': profile})

def new_profile(request):
    return render(request, 'new_profile.html', {'n': range(10)})

def update_profile(request, profile_id):
    profile_name = request.POST['profile_name']
    num_leds = request.POST['num_leds']
    led_rgbs = {}
    for i in range(num_leds):
        current_led = request.POST['led' + str(i)]
        led_rgbs.update({str(i): current_led[1:]})

    Profile.objects.filter(id=profile_id).update(name=profile_name, leds=num_leds, rgb_values=led_rgbs)

    return HttpResponseRedirect(reverse('profile', args=(profile_id,)))

def save_profile(request):
    profile_name = request.POST['profile_name']
    num_leds = request.POST['num_leds']
    led_rgbs = {}
    for i in range(num_leds):
        current_led = request.POST['led' + str(i)]
        led_rgbs.update({str(i): current_led[1:]})

    p = Profile.objects.create(name=profile_name, leds=num_leds, rgb_values=led_rgbs, active=True)
    update_active_profile(p)

    return HttpResponseRedirect(reverse('profile', args=(p.id,)))

def activate_profile(request, profile_id):
    Profile.objects.filter(id=profile_id).update(active=True)
    update_active_profile(Profile.objects.get(id=profile_id))

    return HttpResponseRedirect(reverse('index'))

def update_active_profile(profile):
    for p in Profile.objects.all().exclude(id=profile.id):
        Profile.objects.filter(id=p.id).update(active=False)

def request_json(request):
    if (Profile.objects.filter(active=True).count() == 1):
        p = Profile.objects.get(active=True)
        data = [{'num_leds': p.leds, 'rgb_values': p.rgb_values}]
    else:
        data = [{}]

    return JsonResponse(data, safe=False)
