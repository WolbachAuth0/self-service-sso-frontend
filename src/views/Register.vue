<template>
  <BContainer class="bv-example-row">
    <BRow>
      <BCol>
        <BCard border-variant="primary" header-variant="primary" bg-variant="light" header="Register your business today!">
          <BButton variant="info" class="m-4" @click="modal = !modal">Demo Enterprise IdP Registration</BButton>
          
          <BCardTitle>
            Why Use Enterprise Single Sign-on?
          </BCardTitle>
          
          <BCardText>
            Enterprise Single Sign-On (SSO) provides significant value to your customers by streamlining access to multiple 
            applications with a single login, improving both security and user experience. It reduces password 
            fatigue, IT costs associated with password resets, and the risk of security breaches due to 
            multiple passwords.
          </BCardText>
          <BCardText>
            Offering Enterprise Single Sign-On (SSO) to customers, particularly for businesses (B2B SaaS)
            and those managing employee access to internal tools, provides significant benefits across several
            key areas: 
          </BCardText>

          <BListGroup>
            <BListGroupItem v-for="item of valueItems" class="d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{ item.heading }}</div>
                <ul>
                  <li v-for="reason of item.items">
                    {{ reason.subheading }}
                    <p>
                      {{ reason.text }}
                    </p>
                  </li>
                </ul>
              </div>
              
            </BListGroupItem>
          </BListGroup>
          
        </BCard>
      </BCol>
     
    </BRow>
  </BContainer>

  <BModal v-model="modal" title="Register Enterprise Identity Provider" min-width="800px">
    <h2>How it works</h2>
    <p>
      When you click the "Register Now" button, a request is made to the Auth0 tenant's management API to create a new "self service SSO" ticket.
    </p>
    
    <h5>Create Connection</h5>
    <BRow>
      <BCol sm="3">
        <label for="display_name">Display Name</label>
      </BCol>
      <BCol sm="9">
        <BFormInput id="display_name" type="text" v-model="connection.display_name"/>
      </BCol>
    </BRow>
    <BRow>
      <BCol sm="3">
        <label for="name">Name</label>
      </BCol>
      <BCol sm="9">
        <BFormInput id="name" type="text" v-model="connection.name"/>
      </BCol>
    </BRow>

    <template #footer>
      <BButton v-if="!ticket_url" variant="success" @click="register">Register Now!</BButton>
      <BLink v-else class="btn btn-info" :href="ticket_url" target="_blank">Setup Identity Provider</BLink>
    </template>
  </BModal>
</template>

<script>
import { BButton } from 'bootstrap-vue-next';
import api from './../services/api.js';

export default {
  name: "register-view",
  data () {
    return {
      modal: false,
      ticket_url: null,
      connection: {
        name: 'my-test-connection',
        display_name: 'My Test Connection',
        icon_url: 'https://raw.githubusercontent.com/WolbachAuth0/image-repo/main/public/connection.png?raw=true'
      },
      valueItems: [
        { 
          heading: 'Better vendor and B2B partner management',
          items: [
            { subheading: 'Streamlined Collaboration', text: 'Federated SSO allows users to access applications across different organizations with the same credentials, facilitating efficient and secure collaboration with external partners and vendors.' },
            { subheading: 'Controlled External Access', text: ' Organizations can grant and revoke access to specific applications and data for vendors and partners without disclosing passwords, enhancing security and reducing insider threat risks.' },
          ]
        },
        { 
          heading: 'Improved security',
          items: [
            { subheading: 'Reduced Password-Related Risks', text: ' With SSO, customers only need one set of login credentials, reducing the potential attack surface for hackers and decreasing the likelihood of password reuse or weak password choices across multiple applications.' },
            { subheading: 'Centralized Access Control & Monitoring', text: 'SSO enables centralized management of access policies, making it easier to control user permissions, enforce security measures like Multi-Factor Authentication (MFA), and quickly revoke access across all applications if a user\'s account is compromised.' },
            { subheading: 'Enhanced Audit Trails', text: ' SSO solutions generate comprehensive logs of access activities, providing a clear audit trail that helps identify unusual login attempts and potential security threats. ' },
          ]
        },
        { 
          heading: 'Increased productivity and better user experience',
          items: [
            { subheading: 'Elimination of Password Fatigue', text: 'Users no longer need to remember multiple passwords, saving time and reducing login-related frustrations.' },
            { subheading: 'Faster Access to Resources', text: 'Customers can seamlessly switch between applications without re-entering credentials, improving workflow efficiency and allowing them to focus on their work tasks.' },
            { subheading: 'Streamlined Onboarding & Offboarding', text: 'For employees, SSO simplifies the process of gaining access to necessary resources upon joining and revoking access swiftly upon departure. ' },
          ]
        },
        { 
          heading: 'Reduced IT support costs',
          items: [
            { subheading: 'Fewer Password Reset Requests', text: 'Password-related helpdesk calls, which can be costly and time-consuming, are significantly reduced with SSO due to fewer forgotten passwords.' },
            { subheading: 'Simplified User Management', text: 'Centralized user management and automated processes for provisioning and deprovisioning users free up IT staff to focus on more strategic tasks. ' },
          ]
        },
        { 
          heading: 'Enhanced compliance and regulatory adherence', 
          items: [
            { subheading: 'Easier Compliance', text: 'SSO helps organizations meet security standards outlined in regulations like GDPR, HIPAA, and PCI DSS by simplifying user access tracking and enforcing security policies centrally.' },
            { subheading: 'Comprehensive Audit Capabilities', text: 'SSO\'s robust logging and reporting features provide the necessary documentation for compliance audits.' },
          ]
        },
      ]
    }
  },
  methods: {
    showModal () {
      this.modal = true
    },
    async register () {
      const body = this.connection
      const response = await api.post(this.$auth0, '/api/v1/connections/tickets', body);
      this.ticket_url = response.data.ticket
    }
  }
};
</script>

