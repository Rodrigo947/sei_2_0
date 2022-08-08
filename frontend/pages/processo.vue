<template>
  <v-card height="100%" width="100%">
    <v-card-title> Processo </v-card-title>

    <v-card-text class="pl-10 pr-10">
      <v-form ref="form">
        <v-text-field
          v-model="processo.especificacao"
          label="Especificação"
        ></v-text-field>

        <v-autocomplete
          v-model="usuariosInteressados"
          :items="usuariosDisponiveis"
          item-value="id"
          :item-text="getItemText"
          label="Interessados"
          multiple
          chips
        >
          <template #selection="{ item }">
            <v-chip>
              <span>{{ item.nome }} {{ item.sobrenome }}</span>
            </v-chip>
          </template>
        </v-autocomplete>

        <v-textarea
          v-model="processo.observacoes"
          label="Observações"
          rows="3"
        ></v-textarea>

        <p class="pt-3 mt-1">Nível de Acesso</p>
        <v-radio-group v-model="processo.nivel_acesso" row>
          <v-radio label="Público" value="PUBLICO"></v-radio>
          <v-radio label="Restrito" value="RESTRITO"></v-radio>
          <v-radio label="Sigiloso" value="SIGILOSO"></v-radio>
        </v-radio-group>
      </v-form>
    </v-card-text>
    <v-card-actions class="pl-10 pr-10">
      <v-spacer></v-spacer>
      <v-btn text @click="$router.back()"> Voltar </v-btn>
      <v-btn color="primary" @click="toastErro()"> Editar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProcessoPage',
  data: () => ({
    processo: {},
    usuariosDisponiveis: [],
    usuariosInteressados: [],
  }),
  head: {
    title: 'Processo',
  },
  mounted() {
    this.getProcesso()
    this.getUsuarios()
  },

  methods: {
    async getProcesso() {
      const result = await this.$axios.get(
        `/processo/${this.$router.currentRoute.query.id}`
      )
      this.processo = result.data.data

      for (const item of this.processo.UsuarioRelacaoProcesso) {
        if (item.tipo_relacao !== 'PROPRIETARIO') {
          this.usuariosDisponiveis.push(item.id_usuario)
        }
      }
    },
    async getUsuarios() {
      const result = await this.$axios.post('/usuario/all', {
        ids: this.$auth.user.id,
      })
      this.usuariosDisponiveis = result.data.data
    },

    getItemText(item) {
      return `${item.nome} ${item.sobrenome}`
    },

    toastErro() {
      this.$toast.clear()
      this.$toast.show('Funcionalidade não implementada')
    },
  },
}
</script>

<style></style>
