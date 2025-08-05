import { createAuth0 } from "@auth0/auth0-vue";


// config vars
const environ = import.meta.env;

const config = {
  domain: environ.VITE_AUTH0_CUSTOM_DOMAIN,
  clientId: environ.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    audience: environ.VITE_API_AUDIENCE,
    redirect_uri: environ.VITE_FRONTEND_DOMAIN
  },
  onRedirectCallback: (appState) => {
    console.log(appState)
  },
  skipRedirectCallback: true
}

const auth0 = createAuth0(config);

export { auth0 }