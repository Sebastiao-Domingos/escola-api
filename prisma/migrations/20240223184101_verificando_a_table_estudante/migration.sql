/*
  Warnings:

  - Made the column `foto_id` on table `estudante` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `estudante` DROP FOREIGN KEY `Estudante_foto_id_fkey`;

-- AlterTable
ALTER TABLE `estudante` MODIFY `foto_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Estudante` ADD CONSTRAINT `Estudante_foto_id_fkey` FOREIGN KEY (`foto_id`) REFERENCES `Imagens`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
