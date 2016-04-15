from django.conf.urls import *
from blog.views import archive
 
urlpatterns = patterns('',
                      url(r'^$',archive),
                      url(r'^comments/', include('django_comments.urls')),
                      )