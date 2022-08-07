<template>
  <div class="min-width-300">
    <form @submit.prevent="login">
      <h1 class="mb-3">Bem Vindo</h1>
      <v-text-field
        v-model="user.matriculaSiape"
        prepend-icon="mdi-account"
        label="SIAPE ou Matrícula"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.senha"
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
      matriculaSiape: '',
      senha: '',
    },
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

      this.loading = true
      await this.$auth
        .loginWith('local', { data: userSend })
        .then((success) => {
          this.$auth.setUser(success.data.data)
          this.$router.push('/')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.msg)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style scoped>
.min-width-300 {
  min-width: 300px;
}
</style>
