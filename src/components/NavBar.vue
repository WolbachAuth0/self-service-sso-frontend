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
        <BNavItem to="/">Home</BNavItem>
        <BNavItem to="/register">Register B2B</BNavItem>
        <BNavItem v-if="isAuthenticated" to="/profile">Profile</BNavItem>

        <BNavItemDropdown :text="`Theme (${theme})`" :is-nav="true" active right>
          <BDropdownItem v-for="theme of themes" @click="changeTheme(theme)">{{ theme.name }}</BDropdownItem>
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
const environ = import.meta.env

export default {
  data() {
    return {
      name: "NavBar",
      theme: 'Sketchy',
      colorMode: 'dark',
      variant: 'primary',
      themes: [
        { name: 'Brite', colorMode: 'light', variant: 'primary' },
        { name: 'Cerulean', colorMode: 'dark', variant: 'primary'  },
        { name: 'Cosmo', colorMode: 'dark', variant: 'primary'  },
        { name: 'Cyborg', colorMode: 'dark', variant: 'primary'  },
        { name: 'Darkly', colorMode: 'dark', variant: 'primary'  },
        { name: 'Flatly', colorMode: 'dark', variant: 'primary'  },
        { name: 'Journal', colorMode: 'dark', variant: 'primary'  },
        { name: 'Litera', colorMode: 'dark', variant: 'primary'  },
        { name: 'Lumen', colorMode: 'dark', variant: 'primary'  },
        { name: 'Lux', colorMode: 'dark', variant: 'primary'  },
        { name: 'Materia', colorMode: 'light', variant: 'light'  },
        { name: 'Minty', colorMode: 'dark', variant: 'dark'  },
        { name: 'Morph', colorMode: 'dark', variant: 'primary'  },
        { name: 'Pulse', colorMode: 'dark', variant: 'primary'  },
        // { name: 'Quartz', colorMode: 'dark', variant: 'primary'  },
        { name: 'Sandstone', colorMode: 'dark', variant: 'primary'  },
        { name: 'Simplex', colorMode: 'dark', variant: 'primary'  },
        { name: 'Sketchy', colorMode: 'dark', variant: 'primary'  },
        { name: 'Slate', colorMode: 'dark', variant: 'primary'  },
        { name: 'Solar', colorMode: 'dark', variant: 'primary'  },
        { name: 'Spacelab', colorMode: 'dark', variant: 'primary'  },
        { name: 'Superhero', colorMode: 'dark', variant: 'primary'  },
        { name: 'United', colorMode: 'dark', variant: 'primary'  },
        { name: 'Vapor', colorMode: 'dark', variant: 'primary'  },
        { name: 'Yeti', colorMode: 'dark', variant: 'primary'  },
        { name: 'Zephyr', colorMode: 'dark', variant: 'primary'  },
      ]
    }
  },
  computed: {
    isAuthenticated () {
      return this.$auth0.isAuthenticated.value
    },
    isLoading () {
      return this.$auth0.isLoading.value
    },
    user () {
      return this.$auth0.user.value
    },
    textVariant () {
      return this.colorMode == 'light' ? 'black' : 'white'
    }
  },
  created () {
    console.log(this.$route)
    console.log(this.$route.query?.theme)
  },
  mounted () {
    const options = {
      name: this.theme,
      colorMode: this.colorMode,
      variant: this.variant
    }
    this.changeTheme(options);
  },
  methods: {
    async login () {
      const redirect_uri = `${environ.VITE_FRONTEND_DOMAIN}?theme=${this.theme}`
      const authorizationParams = { redirect_uri }
      console.log(authorizationParams)
      this.$auth0.loginWithRedirect({ authorizationParams })
    },
    async logout () {
      await this.$auth0.logout({
        logoutParams: {
          returnTo: `${window.location.origin}?theme=${this.theme}`
        }
      });
    },
    changeTheme ({ name, colorMode, variant}) {
      this.colorMode = colorMode
      this.variant = variant
      this.theme = name
      const themeLink = document.getElementById('theme-css');
      if (themeLink) {
        themeLink.href = `/assets/css/${String(name).toLowerCase()}/bootstrap.min.css`;
      }
    }
  }
}
</script>

<style lang="css" scoped>
.navbar-nav .btn {
    min-width: 130px;
}
</style>