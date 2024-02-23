/*
  Warnings:

  - You are about to drop the column `foto_id` on the `professor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[professor_id]` on the table `Imagens` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `professor` DROP FOREIGN KEY `Professor_foto_id_fkey`;

-- AlterTable
ALTER TABLE `imagens` ADD COLUMN `professor_id` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `professor` DROP COLUMN `foto_id`;

-- CreateIndex
CREATE UNIQUE INDEX `Imagens_professor_id_key` ON `Imagens`(`professor_id`);

-- AddForeignKey
ALTER TABLE `Imagens` ADD CONSTRAINT `Imagens_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
