/*
  Warnings:

  - You are about to drop the column `foto_id` on the `estudante` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[estudante_id]` on the table `Imagens` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `estudante` DROP FOREIGN KEY `Estudante_foto_id_fkey`;

-- AlterTable
ALTER TABLE `estudante` DROP COLUMN `foto_id`;

-- AlterTable
ALTER TABLE `imagens` ADD COLUMN `estudante_id` VARCHAR(36) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Imagens_estudante_id_key` ON `Imagens`(`estudante_id`);

-- AddForeignKey
ALTER TABLE `Imagens` ADD CONSTRAINT `Imagens_estudante_id_fkey` FOREIGN KEY (`estudante_id`) REFERENCES `Estudante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
