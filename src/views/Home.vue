<template>
  <BCard class="text-center">
    <h1 class="mb-4">Self Service SSO Demo</h1>
    <p class="lead">
      This is a sample application that demonstrates an authentication flow for an SPA, using
      <a href="https://vuejs.org" >Vue.js</a>
    </p>

    <h2 class="my-5 text-center">What can I do next?</h2>

    <BCardGroup deck>
      <BCard v-for="card of firstRow" border-variant="primary" :header="card.title" align="center">
        <BCardText>{{ card.body }}</BCardText>
      </BCard>
    </BCardGroup>

    <BCardGroup deck class="my-3">
      <BCard v-for="card of secondRow" border-variant="primary" :header="card.title" align="center">
        <BCardText>{{ card.body }}</BCardText>
      </BCard>
    </BCardGroup>
  </BCard>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import { useThemeStore } from '../stores/themes.js'

export default {
  name: "home-view",
  data () {
    return {
      firstRow: [
        { title: 'Configure other identity providers', body: 'Auth0 supports social providers as Facebook, Twitter, Instagram and 100+, Enterprise providers as Microsoft Office 365, Google Apps, Azure, and more. You can also use any OAuth2 Authorization Server.' },
        { title: 'Enable Multifactor Authentication', body: 'Add an extra layer of security by enabling Multi-factor Authentication, requiring your users to provide more than one piece of identifying information. Push notifications, authenticator apps, SMS, and DUO Security are supported.' }
      ],
      secondRow: [
        { title: 'Anomaly Detection', body: 'Auth0 can detect anomalies and stop malicious attempts to access your application. Anomaly detection can alert you and your users of suspicious activity, as well as block further login attempts.' },
        { title: 'Learn about Actions', body: 'Actions are JavaScript functions that execute when a user authenticates to your application. They run once the authentication process is complete, and you can use them to customize and extend Auth0\'s capabilities.' }
      ],
    }
  },
  created () {
    const themeName = this.$route.query?.theme
    if (themeName) {
      this.setThemeByName(themeName)
    }
  },
  mounted () {
    this.applyTheme()
  },
  methods: {
    ...mapActions(useThemeStore, [ 'setThemeByName', 'applyTheme' ])
  }
};
</script>
