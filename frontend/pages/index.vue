<template>
  <v-card height="100%" width="100%">
    <v-card-title>Listar Processos</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="processos"
        class="elevation-1"
        hide-default-footer
      >
        <template #[`item.especificacao`]="{ item }">
          <div class="truncate">{{ item.especificacao }}</div>
        </template>
        <template #[`item.observacoes`]="{ item }">
          <div class="truncate">{{ item.observacoes }}</div>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn
            dark
            x-small
            class="primary mr-2"
            @click="editarProcesso(item.id)"
          >
            <v-icon left small> mdi-pencil </v-icon>
            Editar
          </v-btn>
          <v-btn dark x-small class="red darken-2" @click="toastErro()">
            <v-icon left small> mdi-delete </v-icon>
            Excluir
          </v-btn>
        </template>
        <template #no-data> Nenhum documento adicionado </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'HomePage',

  data: () => ({
    headers: [
      {
        text: 'Protocolo',
        align: 'start',
        value: 'protocolo',
      },
      { text: 'Tipo', value: 'tipo_processo.nome' },
      { text: 'Especificação', value: 'especificacao' },
      { text: 'Observação', value: 'observacoes' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    processos: [],
  }),
  head: {
    title: 'Home',
  },

  mounted() {
    this.getProcessos()
  },
  methods: {
    toastErro() {
      this.$toast.clear()
      this.$toast.show('Funcionalidade não implementada')
    },

    editarProcesso(idProcesso) {
      this.$router.push({
        path: '/processo',
        query: { idProcesso, idUser: this.$auth.user.id },
      })
    },

    async getProcessos() {
      const result = await this.$axios.get(
        `/processo/all/${this.$auth.user.id}`
      )
      this.processos = result.data.data
    },
  },
}
</script>

<style scoped>
.truncate {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
