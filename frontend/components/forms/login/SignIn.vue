<template>
  <div class="min-width-300">
    <form @submit.prevent="login">
      <h1 class="mb-3">Bem Vindo</h1>
      <v-text-field
        v-model="user.email"
        v-mask="maskCPFOrPIS"
        prepend-icon="mdi-account"
        label="E-mail, CPF"
        required
        @keyup="formatInputCPFOrPIS()"
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        label="Senha"
        required
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      />
      <v-row>
        <v-col class="align-center justify-end d-flex">
          <v-btn
            type="submit"
            color="indigo darken-1 white--text"
            :loading="loading"
            :disabled="loading"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    user: {
      email: '',
      password: '',
    },
    maskCPFOrPIS: '',
    showPassword: false,
    loading: false,
  }),

  methods: {
    ...mapMutations({
      toggleShowFormSignIn: 'toggleShowFormSignIn',
    }),

    async login() {
      const userSend = {
        ...this.user,
      }
      if (validarCPF(userSend.email) || validarPIS(userSend.email)) {
        userSend.email = userSend.email.replace(/\./g, '').replace(/-/g, '')
      }

      this.loading = true
      await this.$auth
        .loginWith('local', { data: userSend })
        .catch(() => {
          this.$toast.error('Login incorreto')
        })
        .finally(() => {
          this.loading = false
        })
    },
    formatInputCPF() {
      if (validarCPF(this.user.email)) {
        this.maskCPF = '###.###.###-##'
        return 0
      }
      this.maskCPF = ''
    },
  },
}
</script>

<style scoped>
.min-width-300 {
  min-width: 300px;
}
</style>
