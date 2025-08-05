<template>
  <div id="app" class="d-flex flex-column">
    <Navigation />
    <div class="container">
      <error />
      <BCard border-variant="primary" variant="secondary" class="mt-2">
      <router-view />
    </BCard>

    </div>
   
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Error from "./components/Error.vue";

export default {
  components: {
    Navigation,
    Error
  }
};
</script>
