<template>
  <v-app-bar app color="#0089C9" clipped-left>
    <!--<v-app-bar-nav-icon @click="toggleNav"></v-app-bar-nav-icon>-->

    <v-toolbar-title class="pl-6">
      <NuxtLink to="/" class="textHeader">
        <v-row>
          <v-col>
            <v-img
              contain
              max-width="80"
              max-height="40"
              src="logo-header.png"
            />
          </v-col>
          <v-col class="pl-0 d-none d-md-flex" align-self="center">
            Sistema Eletrônico de Informações
          </v-col>
        </v-row>
      </NuxtLink>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-chip class="ma-2" color="transparent" label large @click="toastErro()">
      <v-avatar>
        <v-icon dark color="white"> mdi-home </v-icon>
      </v-avatar>
    </v-chip>

    <v-chip class="ma-2" color="transparent" label large @click="toastErro()">
      <v-avatar>
        <v-icon dark color="white"> mdi-bell </v-icon>
      </v-avatar>
    </v-chip>

    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-chip
          class="ma-2"
          color="transparent"
          label
          large
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar>
            <v-icon dark color="white"> mdi-account-circle </v-icon>
          </v-avatar>
        </v-chip>
      </template>
      <v-list>
        <v-list-item @click="toastErro()">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout()">
          <v-list-item-icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'HeaderComponent',
  data() {
    return {
      userEmail: this.$auth.user.email,
    }
  },
  methods: {
    ...mapMutations({
      toggleNav: 'toggleNav',
    }),
    async logout() {
      await this.$auth.logout()
    },
    toastErro() {
      this.$toast.clear()
      this.$toast.show('Funcionalidade não implementada')
    },
  },
}
</script>

<style scoped>
.textHeader {
  text-decoration: none;
  color: white;
}
</style>
