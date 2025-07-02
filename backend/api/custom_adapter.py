import jwt
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
import os

CLIENT_ID = os.getenv('CLIENT_ID')

class CustomGoogleOAuth2Adapter(GoogleOAuth2Adapter):
    def complete_login(self, request, app, token, **kwargs):
        id_token = token.token

        try:
            data = jwt.decode(
                id_token,
                options={"verify_signature": False},
                audience=CLIENT_ID
            )
        except jwt.DecodeError:
            raise OAuth2Error("Failed to decode ID Token")
        except jwt.InvalidAudienceError:
            raise OAuth2Error("Invalid audience in ID Token")

        extra_data = {
            "sub": data.get("sub"),
            "email": data.get("email"),
            "email_verified": data.get("email_verified"),
            "name": data.get("name"),
            "picture": data.get("picture"),
            "given_name": data.get("given_name"),
            "family_name": data.get("family_name"),
        }

        login = self.get_provider().sociallogin_from_response(request, extra_data)
        return login
