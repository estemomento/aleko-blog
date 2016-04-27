from django.db import models
from django.contrib import admin
from django.utils import timezone
from DjangoUeditor.models import UEditorField
 
# Create your models here.
class BlogCategory(models.Model):
    name = models.CharField(max_length = 20)
    addr = models.CharField(max_length = 256, db_index = True, default='')
    intro = models.TextField
    article_num = models.IntegerField(default = 0)
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'
        ordering = ['name'] 

class BlogPost(models.Model):
    title = models.CharField(max_length = 150)
    addr = models.CharField(max_length = 256, db_index = True, default='')
    author = models.CharField(max_length=128, default='Aleko')
    category = models.ManyToManyField(BlogCategory)
    create_date = models.DateTimeField(auto_now_add=False)
    modify_date = models.DateTimeField(auto_now=False)
    summary = UEditorField('Summary', height=100, width=300,
        default=u'', blank=True, imagePath="uploads/images/",
        toolbars='mini', filePath='uploads/files/', videoPath='uploads/videos/')
    body = UEditorField('Content', height=300, width=1000,
        default=u'', blank=True, imagePath="uploads/images/",
        toolbars='full', filePath='uploads/files/', videoPath='uploads/videos/')
    hit = models.IntegerField(default = 0) 
    like = models.IntegerField(default = 0)
    dislike = models.IntegerField(default = 0)
    def __str__(self):
        return self.title
    class Meta:
        verbose_name = 'post'
        verbose_name_plural = 'posts'
        ordering = ['-modify_date']

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'addr', 'author', 'create_date', 'modify_date')
    class Meta:
        ordering = ['-addr']

class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'addr')

admin.site.register(BlogPost,BlogPostAdmin)
admin.site.register(BlogCategory,BlogCategoryAdmin)