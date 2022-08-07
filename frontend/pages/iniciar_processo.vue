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
                <v-expansion-panels v-model="tipoSelecionado" accordion>
                  <v-expansion-panel
                    v-for="item in tiposProcessos"
                    :key="item.nome"
                    @click="categoriaSelecionada = undefined"
                  >
                    <v-expansion-panel-header>
                      {{ item.nome }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-chip-group
                        v-model="categoriaSelecionada"
                        active-class="primary--text"
                        column
                      >
                        <v-chip
                          v-for="nomeCategoria in item.categorias"
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
                <v-btn color="primary" @click="step = 2"> Continuar </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <!--STEP 1-->

          <!--STEP 2-->
          <v-stepper-content step="2">
            <v-card>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="especificacao"
                    :rules="[(v) => !!v || 'Este campo é obrigatório']"
                    label="Especificação *"
                    required
                  ></v-text-field>

                  <v-select
                    v-model="unidadesSelecionadas"
                    :items="unidadesDisponiveis"
                    :rules="[(v) => !!v || 'Este campo é obrigatório']"
                    label="Unidades interessadas *"
                    required
                    multiple
                    chips
                  ></v-select>

                  <v-textarea
                    v-model="observacoes"
                    :rules="[(v) => !!v || 'Este campo é obrigatório']"
                    label="Observações"
                    required
                    rows="3"
                  ></v-textarea>

                  <p class="pt-3 mt-1">Nível de Acesso</p>
                  <v-radio-group v-model="nivel_acesso" row>
                    <v-radio label="Sigiloso" value="SIGILOSO"></v-radio>
                    <v-radio label="Restrito" value="RESTRITO"></v-radio>
                    <v-radio label="Público" value="PUBLICO"></v-radio>
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

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>
            <v-btn text @click="step = 2"> Voltar </v-btn>
            <v-btn color="primary" @click="step = 1"> Concluir </v-btn>
          </v-stepper-content>
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
    valid: false,
    tiposProcessos: [
      {
        nome: 'Gestão',
        categorias: [
          'Arrecadação',
          'Avaliação de Documentos',
          'Cadastro de Usuário Externo',
          'Credenciamento de Segurança',
        ],
      },
      {
        nome: 'Pessoal',
        categorias: [
          'Adicional Férias',
          'Aposentadoria',
          'Controle de Frequência',
        ],
      },
    ],
    especificacao: '',
    unidadesDisponiveis: ['UFJF', 'UFMG'],
    unidadesSelecionadas: [],
    observacoes: '',
    nivel_acesso: 'PUBLICO',
    tipoSelecionado: undefined,
    categoriaSelecionada: undefined,
  }),
  head: {
    title: 'Home',
  },
  methods: {
    goToStep2() {
      this.step = 2
    },
    goToStep3() {
      this.step = 3
    },
  },
}
</script>

<style scoped>
.no-box-shadow {
  box-shadow: none;
}
</style>
