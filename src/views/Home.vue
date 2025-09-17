<template>
  <BCard class="text-center">
    <h1 class="mb-4">Self Service SSO Demo</h1>
    <p class="lead">
      Using Auth0 for Self-Service SSO and SCIM significantly benefits both SaaS providers and their enterprise customers by accelerating onboarding, enhancing security, and reducing administrative overhead. Instead of managing these integrations manually, the process is streamlined and delegated to the customer's IT team. 
    </p>

    <template v-for="row of cardGroups">
      <h3>{{ row.title }}</h3>
      <BCardGroup deck class="my-3">
        <BCard v-for="card of row.items" border-variant="primary" :header="card.title" align="center">
          <BCardText>{{ card.body }}</BCardText>
        </BCard>
      </BCardGroup>
    </template>
    

  </BCard>
</template>

<script>
import { mapActions } from 'pinia';
import { useThemeStore } from '../stores/themes.js'

export default {
  name: "home-view",
  data () {
    return {
      cardGroups: [
        {
          title: 'Shorter sales and onboarding cycles',
          items: [
            {
              title: 'Reduces developer and support workload',
              body: 'Your engineering team is freed from custom integration requests and repetitive, back-and-forth communication with customer IT teams. This allows your developers to focus on your core product. '
            },
            {
              title: 'Improves enterprise readiness',
              body: 'Offering these self-service capabilities can be a key competitive differentiator, helping your SaaS application secure more enterprise contracts. Enterprise buyers often look for applications that can seamlessly integrate with their existing identity management systems.'
            },
          ],
        },
        {
          title: 'Reduced operational overhead',
          items: [
            {
              title: 'Automated provisioning',
              body: 'Auth0\'s SCIM capabilities automate the creation, update, and deletion of user accounts in real-time, eliminating manual, error-prone tasks for your team.'
            },
            {
              title: 'Simplified license management',
              body: 'SCIM enables more accurate and automated billing by providing a real-time count of active seats. This avoids situations where customers are overcharged for former employees who were not manually de-provisioned. '
            },
          ],
        },
        
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
