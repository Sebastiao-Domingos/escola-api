/*
  Warnings:

  - A unique constraint covering the columns `[administrador_id]` on the table `Imagens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[administrador_id]` on the table `Naturalidade` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data_nascimento` to the `Administrador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `administrador` ADD COLUMN `data_nascimento` DATETIME(3) NOT NULL,
    ADD COLUMN `turma_id` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `contato` ADD COLUMN `administrador_id` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `endereco` ADD COLUMN `administrador_id` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `imagens` ADD COLUMN `administrador_id` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `naturalidade` ADD COLUMN `administrador_id` VARCHAR(36) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Imagens_administrador_id_key` ON `Imagens`(`administrador_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Naturalidade_administrador_id_key` ON `Naturalidade`(`administrador_id`);

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_administrador_id_fkey` FOREIGN KEY (`administrador_id`) REFERENCES `Administrador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naturalidade` ADD CONSTRAINT `Naturalidade_administrador_id_fkey` FOREIGN KEY (`administrador_id`) REFERENCES `Administrador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contato` ADD CONSTRAINT `Contato_administrador_id_fkey` FOREIGN KEY (`administrador_id`) REFERENCES `Administrador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imagens` ADD CONSTRAINT `Imagens_administrador_id_fkey` FOREIGN KEY (`administrador_id`) REFERENCES `Administrador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
