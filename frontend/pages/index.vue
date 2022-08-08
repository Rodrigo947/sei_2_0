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
          <v-icon
            small
            class="mr-2"
            @click="editarProcesso(item.id_tipo_processo)"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="toastErro()"> mdi-delete </v-icon>
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
      this.$router.push({ path: '/processo', query: { id: idProcesso } })
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
