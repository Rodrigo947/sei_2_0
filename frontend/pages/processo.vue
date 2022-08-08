<template>
  <v-card height="100%" width="100%">
    <v-card-title> Processo </v-card-title>

    <v-card-text>
      <v-btn-toggle
        v-model="showDadosDoc"
        borderless
        dense
        mandatory
        color="primary"
      >
        <v-btn value="dados">
          <v-icon class="pr-2 black--text"> fa-solid fa-file-pen </v-icon>
          Dados
        </v-btn>

        <v-btn value="documentos">
          <v-icon class="pr-2 black--text"> mdi-file-document-multiple </v-icon>
          Documentos
        </v-btn>
      </v-btn-toggle>
    </v-card-text>

    <!--DADOS-->
    <div v-if="showDadosDoc == 'dados'">
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
    </div>
    <!--DADOS-->

    <!--DOCUMENTOS-->
    <div v-if="showDadosDoc == 'documentos'">
      <v-card-text class="pl-10 pr-10">
        <v-data-table
          :headers="headers"
          :items="processo.Documento"
          class="elevation-1"
          hide-default-footer
        >
          <template #top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogAssinar" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Assinatura de Documento</span>
                  </v-card-title>

                  <v-card-text>
                    <v-text-field
                      v-model="user.senha"
                      label="Informe a senha do seu login"
                      required
                      prepend-icon="mdi-lock"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeAssinar">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" dark @click="assinar()">
                      Assinar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

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
                        :rules="[(v) => !!v || 'Este campo é obrigatório']"
                        required
                        label="Nome"
                      ></v-text-field>

                      <v-select
                        v-model="novoDocumento.tipo"
                        return-object
                        :items="tiposDocumento"
                        item-text="nome"
                        :rules="[(v) => !!v || 'Este campo é obrigatório']"
                        required
                        label="Tipo"
                      ></v-select>

                      <p class="pt-3 mt-1">Nível de Acesso</p>
                      <v-radio-group v-model="novoDocumento.nivel_acesso" row>
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
                        :rules="[(v) => !!v || 'Este campo é obrigatório']"
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
                    <v-btn color="blue darken-1" dark @click="adicionar">
                      Adicionar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #[`item.tipo_documento`]="{ item }">
            <div class="truncate">{{ item.tipo_documento.nome }}</div>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn
              v-if="item.AssinaturaDocumentoUsuario.length === 0"
              dark
              x-small
              class="mr-2"
              @click="showDialogAssinar(item.id)"
            >
              <v-icon left small> mdi-file-sign </v-icon>
              Assinar
            </v-btn>
            <v-btn v-else x-small class="mr-2" disabled>
              <v-icon left small> mdi-file-sign </v-icon>
              Assinado
            </v-btn>
            <v-btn
              dark
              x-small
              class="yellow darken-2 mr-2"
              @click="toastErro()"
            >
              <v-icon left small> mdi-eye </v-icon>
              Visualizar
            </v-btn>

            <v-btn dark x-small class="primary mr-2" @click="toastErro()">
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
      <v-card-actions class="pl-10 pr-10">
        <v-spacer></v-spacer>
        <v-btn text @click="$router.back()"> Voltar </v-btn>
      </v-card-actions>
    </div>
    <!--DOCUMENTOS-->
  </v-card>
</template>

<script>
export default {
  name: 'ProcessoPage',
  data: () => ({
    processo: {},
    usuariosDisponiveis: [],
    usuariosInteressados: [],
    showDadosDoc: 'dados',
    tiposDocumento: [],
    dialog: false,
    dialogAssinar: false,
    showPassword: false,
    idDocumento: '',
    user: {
      senha: '',
    },
    headers: [
      {
        text: 'Nome',
        align: 'start',
        value: 'nome_arquivo',
      },
      { text: 'Tipo', value: 'tipo_documento' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    formDocumentoValido: false,
    niveisDeAcesso: [
      { nome: 'Público', tipo: 'PUBLICO' },
      { nome: 'Restrito', tipo: 'RESTRITO' },
      { nome: 'Sigiloso', tipo: 'SIGILOSO' },
    ],
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
    title: 'Processo',
  },
  mounted() {
    this.getProcesso()
    this.getUsuarios()
    this.getTipoDocumento()
  },

  methods: {
    async getProcesso() {
      const result = await this.$axios.get(`/processo`, {
        params: {
          idUser: this.$router.currentRoute.query.idUser,
          idProcesso: this.$router.currentRoute.query.idProcesso,
        },
      })
      this.processo = result.data.data

      for (const item of this.processo.UsuarioRelacaoProcesso) {
        if (item.tipo_relacao !== 'PROPRIETARIO') {
          this.usuariosInteressados.push(item.id_usuario)
        }
      }
    },
    async getUsuarios() {
      const result = await this.$axios.post('/usuario/all', {
        ids: this.$auth.user.id,
      })
      this.usuariosDisponiveis = result.data.data
    },

    async getTipoDocumento() {
      const result = await this.$axios.post('/tipo-documento/list')
      this.tiposDocumento = result.data.data
    },

    getItemText(item) {
      return `${item.nome} ${item.sobrenome}`
    },

    close() {
      this.dialog = false
      this.$refs.formDocumento.resetValidation()
      this.novoDocumento = Object.assign({}, this.defaultItem)
    },

    closeAssinar() {
      this.dialogAssinar = false
      this.user.senha = ''
    },

    async adicionar() {
      if (this.$refs.formDocumento.validate()) {
        const dataSend = {
          ...this.novoDocumento,
          nivel_de_acesso: this.novoDocumento.nivel_acesso.tipo,
          id_tipo_documento: this.novoDocumento.tipo.id,
          id_processo: this.$router.currentRoute.query.idProcesso,
          id_usuario_criador: this.$auth.user.id,
        }

        delete dataSend.arquivo
        delete dataSend.nivel_acesso
        delete dataSend.tipo

        await this.$axios.post('/documento/create', dataSend)

        this.getProcesso()
        this.$toast.success('Documento Criado')

        this.close()
      } else {
        this.$toast.clear()
        this.$toast.error('Existem campos não preenchidos!')
      }
    },

    showDialogAssinar(idDocumento) {
      this.idDocumento = idDocumento
      this.dialogAssinar = true
    },

    async assinar() {
      const dataSend = {
        id_usuario: this.$auth.user.id,
        senha: this.user.senha,
        id_documento: this.idDocumento,
      }

      await this.$axios
        .post('/documento/assinar', dataSend)
        .then((response) => {
          this.$toast.success(response.data.msg)
          this.getProcesso()
          this.closeAssinar()
        })
        .catch((error) => {
          this.$toast.error(error.response.data.msg)
        })
    },

    toastErro() {
      this.$toast.clear()
      this.$toast.show('Funcionalidade não implementada')
    },
  },
}
</script>

<style></style>
