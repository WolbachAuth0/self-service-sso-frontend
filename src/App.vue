<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <div class="container">
      <error />
      <BCard border-variant="none" class="mt-5">
      <router-view />
    </BCard>

    </div>
   
  </div>
</template>

<script lang="ts">
import NavBar from "./components/NavBar.vue";
import Error from "./components/Error.vue";

export default {
  components: {
    NavBar,
    Error
  }
};
</script>
