from rest_framework import serializers
from .models import Account

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id','email','password')
        extra_kwargs={'email':{'write_only':False,'required':True},'password': {'write_only': True}}

    def create(self, validated_data):
        user = Account(
                email=validated_data['email'],
            )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
