/*
  Warnings:

  - A unique constraint covering the columns `[foto_id]` on the table `Estudante` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[foto_id]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `foto_id` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `estudante` ADD COLUMN `foto_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `professor` ADD COLUMN `foto_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Estudante_foto_id_key` ON `Estudante`(`foto_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Professor_foto_id_key` ON `Professor`(`foto_id`);

-- AddForeignKey
ALTER TABLE `Estudante` ADD CONSTRAINT `Estudante_foto_id_fkey` FOREIGN KEY (`foto_id`) REFERENCES `Imagens`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professor` ADD CONSTRAINT `Professor_foto_id_fkey` FOREIGN KEY (`foto_id`) REFERENCES `Imagens`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
