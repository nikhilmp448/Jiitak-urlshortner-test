from django.db import models

class URLShortener(models.Model):
    url = models.URLField()
    slug = models.SlugField()

    def __str__(self):
        return self.url