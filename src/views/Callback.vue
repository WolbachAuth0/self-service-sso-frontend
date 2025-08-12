<template>
  <div>

    <div v-if="loading" class="text-center mb-3 d-flex">
      <BSpinner variant="primary" />
    </div>
    <error v-if="error"/>

  </div>
</template>

<script lang="ts">
import Error from './../components/Error.vue'; 
import { mapState, mapActions } from 'pinia';
import { useThemeStore } from '../stores/themes.js';

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
    const query = this.$route.query
    console.log('callback component mounted.');
    console.log(query)
    const isAuthenticated = this.$auth0.isAuthenticated.value;
    console.log('isAuthenticated:', isAuthenticated);
    try {
      // Process the redirect callback from Auth0
      const result = await this.$auth0.handleRedirectCallback();
      const target = result?.appState?.target ?? '/';
      if (result?.appState?.state) {
        console.log('setstate')
        this.setTheme(result.appState.state);
      }
      await router.replace(target);
    } catch (e) {
      console.error('Callback handling error:', e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions(useThemeStore, [ 'setTheme' ])
  }
};
</script>