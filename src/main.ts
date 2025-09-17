import App from './App.vue';
import { createApp } from "vue";
import { createRouter } from "./router";
import { auth0 } from './plugins/auth0'
import { createBootstrap } from 'bootstrap-vue-next';
import { createPinia } from 'pinia';

// Highlight.js
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github.css";
hljs.registerLanguage('json', json);

// config vars
const environ = import.meta.env;

// Components
const app = createApp(App);
const router = createRouter(app);
const pinia = createPinia();

app
  .use(hljsVuePlugin)
  .use(router)
  .use(pinia)
  .use(createBootstrap())

router
  .isReady()
  .then(() => {
    app.use(auth0);
    app.mount('#app');
  });
