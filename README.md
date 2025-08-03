# Scenario #1 - Logging In and Gated Content

This sample demonstrates:

- Logging in to Auth0 using Redirect Mode
- Accessing profile information that has been provided in the ID token
- Gated content. The `/profile` route is not accessible without having first logged in

## Project setup

```bash
npm install
```

### Configuration

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this, first copy `auth_config.json.example` into a new file in the same folder called `auth_config.json`, and replace the values within with your own Auth0 application credentials:

```bash
AUDIENCE=<AUDIENCE_FOR_YOUR_BACKEND>
MANAGEMENT_API_CLIENT_ID=<CLIENT_ID_FOR_MANAGEMENT_API_M2M>
MANAGEMENT_API_CLIENT_SECRET=<CLIENT_SECRET_FOR_MANAGEMENT_API_M2M>

VITE_AUTH0_DOMAIN=<YOUR_TENANT_DOMAIN>
VITE_AUTH0_CUSTOM_DOMAIN=<YOUR_CUSTOM_DOMAIN>
VITE_AUTH0_CLIENT_ID=<YOUR_CLIENT_ID>
```


## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](../LICENSE) file for more info.
