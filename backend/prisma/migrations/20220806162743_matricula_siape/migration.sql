/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siape]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricula` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siape` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "matricula" VARCHAR(255) NOT NULL,
ADD COLUMN     "siape" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_matricula_key" ON "usuario"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_siape_key" ON "usuario"("siape");
