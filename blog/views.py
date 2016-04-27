from django.shortcuts import render
from django.template import loader,Context
from django.http import HttpResponse
from blog.models import BlogPost, BlogCategory
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
# Create your views here.
 
def archive(request):
    posts = BlogPost.objects.all()
    categories = BlogCategory.objects.all()
    t = loader.get_template("archive.html")
    c = Context({'categories':categories, 'posts':posts})
    return HttpResponse(t.render(c))

def about(request):
    categories = BlogCategory.objects.all()
    return render(request, 'about.html', {'categories':categories})

def post(request, post_addr):
    post = BlogPost.objects.get(addr = post_addr)
    categories = BlogCategory.objects.all()
    post.hit += 1
    if 'like' in request.POST:
        post.like += 1
    if 'dislike' in request.POST:
        post.dislike += 1
    post.save()
    return render(request, 'post.html', {'post': post, 'categories':categories})

def category(request, category_addr):
    category = BlogCategory.objects.get(addr = category_addr)
    categories = BlogCategory.objects.all()
    return render(request, 'category.html', { 'category': category, 'categories':categories})

def ludan(request):
    return render(request, 'ludan.html')

def index(request):
    return render(request, 'index.html')

def orgen(request):
    return render(request, 'or-gen.html')