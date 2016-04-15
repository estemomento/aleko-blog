"""blogsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from DjangoUeditor import urls as DjangoUeditor_urls
from django_comments import urls as Comment_urls

urlpatterns = [
    url(r'^', include('blog.urls')),
    url(r'^index/', 'blog.views.index'),
    url(r'^blog/', include('blog.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^about/', 'blog.views.about'),
    url(r'^ueditor/', include(DjangoUeditor_urls)),
    url(r'^category/(?P<category_addr>[^/]+)/$', 'blog.views.category', name='category'),
    url(r'^post/(?P<post_addr>[^/]+)/$', 'blog.views.post', name='post'),
    url(r'^comments/', include(Comment_urls)),
    url(r'^ludan/', 'blog.views.ludan'),
]

# use Django server /media/ files
from django.conf import settings
 
if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)