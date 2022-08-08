<template>
  <v-card height="100%" width="100%">
    <v-card-title>Iniciar Processo</v-card-title>

    <v-card-text>
      <v-stepper v-model="step" class="no-box-shadow" flat>
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">
            Escolha o tipo de processo
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="step > 2" step="2">
            Preencha os dados
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Adicione Arquivos </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <!--STEP 1-->
          <v-stepper-content step="1">
            <v-card>
              <v-card-text>
                <v-expansion-panels v-model="grupoSelecionado" accordion>
                  <v-expansion-panel
                    v-for="item in tiposProcessos"
                    :key="item.grupo"
                    @click="tipoSelecionado = undefined"
                  >
                    <v-expansion-panel-header>
                      {{ item.grupo }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-chip-group
                        v-model="tipoSelecionado"
                        active-class="primary--text"
                        column
                      >
                        <v-chip
                          v-for="tipo in item.tipos"
                          :key="tipo.id"
                          :value="tipo.id"
                          filter
                          outlined
                        >
                          {{ tipo.nome }}
                        </v-chip>
                      </v-chip-group>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="goToStep2()"> Continuar </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <!--STEP 1-->

          <!--STEP 2-->
          <v-stepper-content step="2">
            <v-card>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    v-model="especificacao"
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
                    v-model="observacoes"
                    label="Observações"
                    rows="3"
                  ></v-textarea>

                  <p class="pt-3 mt-1">Nível de Acesso</p>
                  <v-radio-group v-model="nivel_acesso" row>
                    <v-radio label="Público" value="PUBLICO"></v-radio>
                    <v-radio label="Restrito" value="RESTRITO"></v-radio>
                    <v-radio label="Sigiloso" value="SIGILOSO"></v-radio>
                  </v-radio-group>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="step = 1"> Voltar </v-btn>
                <v-btn color="primary" @click="goToStep3()"> Continuar </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <!--STEP 2-->

          <!--STEP 3-->
          <v-stepper-content step="3">
            <v-card>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="documentos"
                  class="elevation-1"
                  hide-default-footer
                >
                  <template #top>
                    <v-toolbar flat>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" max-width="500px">
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Novo Documento
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">Novo Documento</span>
                          </v-card-title>

                          <v-card-text>
                            <v-form
                              ref="formDocumento"
                              v-model="formDocumentoValido"
                              lazy-validation
                            >
                              <v-text-field
                                v-model="novoDocumento.nome_arquivo"
                                :rules="[
                                  (v) => !!v || 'Este campo é obrigatório',
                                ]"
                                required
                                label="Nome"
                              ></v-text-field>

                              <v-select
                                v-model="novoDocumento.tipo"
                                return-object
                                :items="tiposDocumento"
                                item-text="nome"
                                :rules="[
                                  (v) => !!v || 'Este campo é obrigatório',
                                ]"
                                required
                                label="Tipo"
                              ></v-select>

                              <p class="pt-3 mt-1">Nível de Acesso</p>
                              <v-radio-group
                                v-model="novoDocumento.nivel_acesso"
                                row
                              >
                                <v-radio
                                  v-for="item in niveisDeAcesso"
                                  :key="item.tipo"
                                  :label="item.nome"
                                  :value="item"
                                ></v-radio>
                              </v-radio-group>

                              <v-textarea
                                v-model="novoDocumento.observacao"
                                rows="3"
                                label="Observação"
                              ></v-textarea>

                              <v-file-input
                                v-model="novoDocumento.arquivo"
                                label="Arquivo"
                                :rules="[
                                  (v) => !!v || 'Este campo é obrigatório',
                                ]"
                                truncate-length="15"
                                required
                              ></v-file-input>
                            </v-form>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              dark
                              @click="adicionar"
                            >
                              Adicionar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template #[`item.tipo`]="{ item }">
                    <div class="truncate">{{ item.tipo.nome }}</div>
                  </template>
                  <template #[`item.nivel_acesso`]="{ item }">
                    <div class="truncate">{{ item.nivel_acesso.nome }}</div>
                  </template>
                  <template #[`item.observacao`]="{ item }">
                    <div class="truncate">{{ item.observacao }}</div>
                  </template>
                  <template #[`item.actions`]>
                    <v-icon small class="mr-2" @click="toastErro()">
                      mdi-pencil
                    </v-icon>
                    <v-icon small @click="toastErro()"> mdi-delete </v-icon>
                  </template>
                  <template #no-data> Nenhum documento adicionado </template>
                </v-data-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="step = 2"> Voltar </v-btn>
                <v-btn color="primary" @click="salvarProcesso()">
                  Salvar Processo
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <!--STEP 3-->
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    step: 1,

    // STEP 1
    tiposProcessos: [],
    grupoSelecionado: undefined,
    tipoSelecionado: undefined,
    // STEP 1

    // STEP 2
    usuariosDisponiveis: [],
    niveisDeAcesso: [
      { nome: 'Público', tipo: 'PUBLICO' },
      { nome: 'Restrito', tipo: 'RESTRITO' },
      { nome: 'Sigiloso', tipo: 'SIGILOSO' },
    ],
    especificacao: '',
    usuariosInteressados: [],
    observacoes: '',
    nivel_acesso: 'PUBLICO',
    // STEP 2

    // STEP 3
    formDocumentoValido: false,
    tiposDocumento: [],

    dialog: false,
    headers: [
      {
        text: 'Nome',
        align: 'start',
        value: 'nome_arquivo',
      },
      { text: 'Tipo', value: 'tipo' },
      { text: 'Nivel de Acesso', value: 'nivel_acesso' },
      { text: 'Observação', value: 'observacao' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    documentos: [],

    novoDocumento: {
      nome_arquivo: undefined,
      tipo: undefined,
      nivel_acesso: { nome: 'Público', tipo: 'PUBLICO' },
      observacao: undefined,
      arquivo: undefined,
    },
    defaultItem: {
      nome_arquivo: undefined,
      tipo: undefined,
      nivel_acesso: { nome: 'Público', tipo: 'PUBLICO' },
      observacao: undefined,
      arquivo: undefined,
    },
  }),

  head: {
    title: 'Home',
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  mounted() {
    this.getTipoDocumento()
    this.getTipoProcesso()
    this.getUsuarios()
  },
  methods: {
    goToStep2() {
      if (
        this.grupoSelecionado === undefined ||
        this.tipoSelecionado === undefined
      ) {
        this.$toast.error('Escolha um tipo de processo antes de prosseguir')
        return
      }

      this.step = 2
    },
    goToStep3() {
      this.step = 3
    },

    close() {
      this.dialog = false
      this.$refs.formDocumento.resetValidation()
      this.novoDocumento = Object.assign({}, this.defaultItem)
    },

    adicionar() {
      if (this.$refs.formDocumento.validate()) {
        this.documentos.push(this.novoDocumento)
        this.close()
      } else {
        this.$toast.clear()
        this.$toast.error('Existem campos não preenchidos!')
      }
    },

    async salvarProcesso() {
      if (this.documentos.length === 0) {
        this.$toast.clear()
        this.$toast.error('Adicione pelo menos um arquivo!')
        return
      }

      const documentosSend = [...this.documentos]

      for (const doc of documentosSend) {
        doc.id_usuario_criador = this.$auth.user.id
        doc.nivel_de_acesso = doc.nivel_acesso.tipo
        doc.id_tipo_documento = doc.tipo.id
        delete doc.nivel_acesso
        delete doc.tipo
        delete doc.arquivo
      }

      const dataSend = {
        id_usuario: this.$auth.user.id,
        processo: {
          id_tipo_processo: this.tipoSelecionado,
          especificacao: this.especificacao,
          observacoes: this.observacoes,
          nivel_acesso: this.nivel_acesso,
        },
        usuariosInteressados: this.usuariosInteressados,
        documentos: documentosSend,
      }

      await this.$axios.post('/processo/create', dataSend)

      this.$toast.clear()
      this.$toast.success('Processo criado!')

      this.$router.push('/')
    },

    toastErro() {
      this.$toast.clear()
      this.$toast.show('Funcionalidade não implementada')
    },

    getItemText(item) {
      return `${item.nome} ${item.sobrenome}`
    },

    async getTipoDocumento() {
      const result = await this.$axios.post('/tipo-documento/list')
      this.tiposDocumento = result.data.data
    },
    async getTipoProcesso() {
      const result = await this.$axios.post('/tipo-processo/list')
      this.tiposProcessos = result.data.data
    },
    async getUsuarios() {
      const result = await this.$axios.post('/usuario/all', {
        ids: this.$auth.user.id,
      })
      this.usuariosDisponiveis = result.data.data
    },
  },
}
</script>

<style scoped>
.no-box-shadow {
  box-shadow: none;
}

.truncate {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
