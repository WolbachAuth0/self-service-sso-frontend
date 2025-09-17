<template>
  <BNavbar
    toggleable="lg"
    :variant="variant"
    class="py-3"
    :data-bs-theme="colorMode"
  >

    <BNavbarBrand href="https://auth0.com" class="logo mx-4"/>
    <BNavbarToggle target="nav-text-collapse" />
    <BCollapse id="nav-text-collapse" is-nav>
      <BNavbarNav>
        <BNavItem :to="`/`">Home</BNavItem>
        <BNavItem v-if="isAuthenticated" to="/register">Register B2B</BNavItem>
        <BNavItem v-if="isAuthenticated" to="/profile">Profile</BNavItem>

        <BNavItemDropdown :text="`Theme (${themeName})`" :is-nav="true" active right>
          <BDropdownItem v-for="theme of themes" @click="setTheme(theme)">{{ theme.themeName }}</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>

    <BNavbarNav>
      <BAvatar v-if="isAuthenticated" to="/profile" :src="user.picture"/>
      <BButton v-if="isAuthenticated" pill variant="info" class="m-2 my-sm-0" @click="logout">
        Logout
      </BButton>
      <BButton v-else pill variant="info" class="m-2 my-sm-0" @click="login">
        Login
      </BButton>
    </BNavbarNav>
  </BNavbar>

</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useThemeStore } from '../stores/themes.js'
const environ = import.meta.env

export default {
  data() {
    return {
      name: "Navigation",
    }
  },
  computed: {
    ...mapState(useThemeStore, ['themeName', 'colorMode', 'variant', 'themes']),
    isAuthenticated () {
      return this.$auth0.isAuthenticated.value
    },
    // isLoading () {
    //   return this.$auth0.isLoading.value
    // },
    user () {
      return this.$auth0.user.value
    },
    textVariant () {
      return this.colorMode == 'light' ? 'black' : 'white'
    }
  },
  methods: {
    ...mapActions(useThemeStore, [ 'setTheme' ]),
    async login () {
      const state = {
        themeName: this.themeName,
        colorMode: this.colorMode,
        variant: this.variant
      }

      const authorizationParams = {
        redirect_uri: `${environ.VITE_FRONTEND_DOMAIN}/callback`,
        audience: environ.VITE_API_AUDIENCE,
      }
      const appState = {
        target: `/profile`,
        state
      }
      this.$auth0.loginWithRedirect({ authorizationParams, appState })
    },
    async logout () {
      await this.$auth0.logout({
        logoutParams: {
          returnTo: `${window.location.origin}`
        }
      });
    }
  }
}
</script>

<style lang="css" scoped>
.navbar-nav .btn {
    min-width: 130px;
}
</style>