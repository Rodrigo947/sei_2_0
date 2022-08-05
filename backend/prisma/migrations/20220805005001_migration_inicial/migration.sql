-- CreateEnum
CREATE TYPE "NivelAcesso" AS ENUM ('SIGILOSO', 'RESTRITO', 'PUBLICO');

-- CreateEnum
CREATE TYPE "Grupo" AS ENUM ('PESSOAL', 'GESTAO');

-- CreateEnum
CREATE TYPE "TipoRelacao" AS ENUM ('PROPRIETARIO', 'INTERESSADO');

-- CreateTable
CREATE TABLE "unidade" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(255) NOT NULL,
    "sigla" VARCHAR(255) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "logradouro" VARCHAR(30) NOT NULL,
    "numero" VARCHAR(50) NOT NULL,
    "complemento" VARCHAR(50),
    "bairro" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "telefone" VARCHAR(30) NOT NULL,

    CONSTRAINT "unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(255) NOT NULL,
    "sobrenome" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "rg" VARCHAR(8) NOT NULL,
    "orgao_expeditor" VARCHAR(30) NOT NULL,
    "telefone" VARCHAR(30) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "logradouro" VARCHAR(30) NOT NULL,
    "numero" VARCHAR(50) NOT NULL,
    "complemento" VARCHAR(50),
    "bairro" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "protocolo" SERIAL NOT NULL,
    "id_tipo_processo" UUID NOT NULL,
    "especificacao" VARCHAR(255) NOT NULL,
    "nivel_acesso" "NivelAcesso" NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "processo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_processo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(255) NOT NULL,
    "grupo" "Grupo" NOT NULL,

    CONSTRAINT "tipo_processo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome_arquivo" VARCHAR(255) NOT NULL,
    "observacao" VARCHAR(255) NOT NULL,
    "id_tipo_documento" UUID NOT NULL,
    "nivel_de_acesso" "NivelAcesso" NOT NULL,
    "id_usuario_criador" UUID NOT NULL,
    "id_processo" UUID NOT NULL,

    CONSTRAINT "documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_documento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "tipo_documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assinatura_documento_usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_usuario" UUID NOT NULL,
    "id_documento" UUID NOT NULL,

    CONSTRAINT "assinatura_documento_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificacao" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "mensagem" VARCHAR(255) NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_processo" UUID NOT NULL,

    CONSTRAINT "notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processo_concluido_unidade" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "id_processo" UUID NOT NULL,
    "id_unidade" UUID NOT NULL,

    CONSTRAINT "processo_concluido_unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade_interessado_documento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_unidade" UUID NOT NULL,
    "id_documento" UUID NOT NULL,

    CONSTRAINT "unidade_interessado_documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_relacao_processo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "motivo" VARCHAR(255) NOT NULL,
    "tipo_relacao" "TipoRelacao" NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_processo" UUID NOT NULL,

    CONSTRAINT "usuario_relacao_processo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unidade_sigla_key" ON "unidade"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_rg_key" ON "usuario"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "processo_protocolo_key" ON "processo"("protocolo");

-- AddForeignKey
ALTER TABLE "processo" ADD CONSTRAINT "processo_id_tipo_processo_fkey" FOREIGN KEY ("id_tipo_processo") REFERENCES "tipo_processo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_id_usuario_criador_fkey" FOREIGN KEY ("id_usuario_criador") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_id_tipo_documento_fkey" FOREIGN KEY ("id_tipo_documento") REFERENCES "tipo_documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_id_processo_fkey" FOREIGN KEY ("id_processo") REFERENCES "processo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinatura_documento_usuario" ADD CONSTRAINT "assinatura_documento_usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinatura_documento_usuario" ADD CONSTRAINT "assinatura_documento_usuario_id_documento_fkey" FOREIGN KEY ("id_documento") REFERENCES "documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_processo_fkey" FOREIGN KEY ("id_processo") REFERENCES "processo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo_concluido_unidade" ADD CONSTRAINT "processo_concluido_unidade_id_processo_fkey" FOREIGN KEY ("id_processo") REFERENCES "processo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo_concluido_unidade" ADD CONSTRAINT "processo_concluido_unidade_id_unidade_fkey" FOREIGN KEY ("id_unidade") REFERENCES "unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_interessado_documento" ADD CONSTRAINT "unidade_interessado_documento_id_unidade_fkey" FOREIGN KEY ("id_unidade") REFERENCES "unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_interessado_documento" ADD CONSTRAINT "unidade_interessado_documento_id_documento_fkey" FOREIGN KEY ("id_documento") REFERENCES "documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_relacao_processo" ADD CONSTRAINT "usuario_relacao_processo_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_relacao_processo" ADD CONSTRAINT "usuario_relacao_processo_id_processo_fkey" FOREIGN KEY ("id_processo") REFERENCES "processo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
