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
                    @click="nomeSelecionado = undefined"
                  >
                    <v-expansion-panel-header>
                      {{ item.grupo }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-chip-group
                        v-model="nomeSelecionado"
                        active-class="primary--text"
                        column
                      >
                        <v-chip
                          v-for="nomeCategoria in item.nome"
                          :key="nomeCategoria"
                          filter
                          outlined
                        >
                          {{ nomeCategoria }}
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

                  <v-select
                    v-model="unidadesSelecionadas"
                    :items="unidadesDisponiveis"
                    label="Unidades interessadas"
                    multiple
                    chips
                  ></v-select>

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
                                v-model="novoDocumento.nome"
                                :rules="[
                                  (v) => !!v || 'Este campo é obrigatório',
                                ]"
                                required
                                label="Nome"
                              ></v-text-field>

                              <v-select
                                v-model="novoDocumento.tipo"
                                :items="tiposDocumento"
                                item-text="nome"
                                item-value="id"
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
                                  label="Público"
                                  value="PUBLICO"
                                ></v-radio>
                                <v-radio
                                  label="Restrito"
                                  value="RESTRITO"
                                ></v-radio>
                                <v-radio
                                  label="Sigiloso"
                                  value="SIGILOSO"
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
    tiposProcessos: [
      {
        grupo: 'Gestão',
        nome: [
          'Arrecadação',
          'Avaliação de Documentos',
          'Cadastro de Usuário Externo',
          'Credenciamento de Segurança',
        ],
      },
      {
        grupo: 'Pessoal',
        nome: ['Adicional Férias', 'Aposentadoria', 'Controle de Frequência'],
      },
    ],
    grupoSelecionado: undefined,
    nomeSelecionado: undefined,
    // STEP 1

    // STEP 2
    unidadesDisponiveis: ['UFJF', 'UFMG'],

    especificacao: '',
    unidadesSelecionadas: [],
    observacoes: '',
    nivel_acesso: 'PUBLICO',
    // STEP 2

    // STEP 3
    formDocumentoValido: false,
    tiposDocumento: [
      { id: '1', nome: 'Autorização' },
      { id: '2', nome: 'Externo' },
      { id: '3', nome: 'Ofício' },
    ],

    dialog: false,
    headers: [
      {
        text: 'Nome',
        align: 'start',
        value: 'nome',
      },
      { text: 'Tipo', value: 'tipo' },
      { text: 'Nivel de Acesso', value: 'nivel_acesso' },
      { text: 'Observação', value: 'observacao' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    documentos: [],

    novoDocumento: {
      nome: undefined,
      tipo: undefined,
      nivel_acesso: 'PUBLICO',
      observacao: undefined,
      arquivo: undefined,
    },
    defaultItem: {
      nome: undefined,
      tipo: undefined,
      nivel_acesso: 'PUBLICO',
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
  methods: {
    goToStep2() {
      if (
        this.grupoSelecionado === undefined ||
        this.nomeSelecionado === undefined
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

    salvarProcesso() {
      if (this.documentos.length === 0) {
        this.$toast.clear()
        this.$toast.error('Adicione pelo menos um arquivo!')
        return
      }

      this.$toast.clear()
      this.$toast.success('Processo criado!')

      this.$router.push('/')
    },

    toastErro() {
      this.$toast.clear()
      this.$toast.show('Funcionalidade não implementada')
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
