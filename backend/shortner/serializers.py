from rest_framework import serializers

from .models import URLShortener

class URLShortenerSerializer(serializers.ModelSerializer):

    class Meta:
        model = URLShortener
        fields = ('url','slug')
        extra_kwargs={'slug':{'read_only':True}}