from datetime import datetime
from rest_framework_simplejwt.models import TokenBlacklist

class TokenBlacklistBackend:
    def add_to_blacklist(self, token):
        # Add the token to the blacklist
        token_blacklist = TokenBlacklist(token=token)
        token_blacklist.save()

    def check_blacklist(self, token):
        # Check if the token is blacklisted
        return TokenBlacklist.objects.filter(token=token).exists()

    def revoke_token(self, token):
        # Revoke the token (add it to the blacklist)
        self.add_to_blacklist(token)