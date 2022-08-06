-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "id_unidade" UUID;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_unidade_fkey" FOREIGN KEY ("id_unidade") REFERENCES "unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
