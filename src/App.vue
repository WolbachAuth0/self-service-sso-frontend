<template>
  <div id="app" class="d-flex flex-column">
    <Navigation />

    <div class="container">
      <BProgress
        class="mt-3"
        :variant="variant"
        :value="100"
        :animated="loading"
      />

      <BCard border-variant="primary" variant="secondary" class="mt-2">
        <router-view />
      </BCard>
    </div>
   
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { mapState } from 'pinia';
import { useThemeStore } from './stores/themes.js';

export default {
  components: {
    Navigation
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(useThemeStore, ['loading']),
    variant () {
      return this.loading ? 'warning' : 'success'
    }
  },
};
</script>

<style lang="css" scoped>
#app {
  background-image: "https://raw.githubusercontent.com/WolbachAuth0/image-repo/main/public/tech-bg.png?raw=true";
}
</style>
