import { createApp } from "vue";
import { createRouter } from "./router";
import { createAuth0 } from "@auth0/auth0-vue";
import { createBootstrap } from 'bootstrap-vue-next'

// Highlight.js
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github.css";
hljs.registerLanguage('json', json);

// config vars
const environ = import.meta.env

// Components
import App from './App.vue'
const app = createApp(App);

const router = createRouter(app)
app
  .use(hljsVuePlugin)
  .use(router)
  .use(
    createAuth0({
      domain: environ.VITE_AUTH0_CUSTOM_DOMAIN,
      clientId: environ.VITE_AUTH0_CLIENT_ID,
      // authorizationParams: {
      //   redirect_uri: environ.VITE_FRONTEND_DOMAIN
      // }
    })
  )
  .use(createBootstrap())

router
  .isReady()
  .then(() => {
    app.mount('#app');
  });
