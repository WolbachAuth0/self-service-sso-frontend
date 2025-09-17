<template>
  <div>
    <error v-if="error"/>
  </div>
</template>

<script>
import Error from './../components/Error.vue'; 
import { mapState, mapActions } from 'pinia';
import { useThemeStore } from './../stores/themes.js';

export default {
  name: 'Callback',
  components: {
    Error
  },
  data () {
    return {
      // This component does not have any data properties
      loading: true,
      error: {
        value: null
      }
    };
  },
  computed: {
    ...mapState(useThemeStore, ['themeName', 'colorMode', 'variant']),
  },
  async mounted () {
    this.setLoading(true)
    try {
      // Process the redirect callback from Auth0
      const result = await this.$auth0.handleRedirectCallback();
      const appState = result?.appState;
      const target = appState?.target ?? '/';
      
      if (appState?.state) {
        console.log('setstate')
        this.setTheme(result.appState.state);
      }

      window.history.replaceState({}, '', '/');

      if (router) {
        router.push(target);
      }

    } catch (e) {
      console.error('Callback handling error:', e);
    } finally {
      this.setLoading(false);
    }
  },
  methods: {
    ...mapActions(useThemeStore, [ 'setTheme', 'setLoading' ])
  }
};
</script>