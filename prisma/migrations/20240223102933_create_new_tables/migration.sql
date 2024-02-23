/*
  Warnings:

  - You are about to alter the column `estudante_id` on the `endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(36)`.
  - A unique constraint covering the columns `[professor_id]` on the table `Naturalidade` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departamento_id` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `Endereco_estudante_id_fkey`;

-- DropForeignKey
ALTER TABLE `naturalidade` DROP FOREIGN KEY `Naturalidade_estudante_id_fkey`;

-- AlterTable
ALTER TABLE `contato` ADD COLUMN `professor_id` VARCHAR(36) NULL,
    MODIFY `estudante_id` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `curso` ADD COLUMN `departamento_id` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `endereco` ADD COLUMN `professor_id` VARCHAR(36) NULL,
    MODIFY `estudante_id` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `naturalidade` ADD COLUMN `professor_id` VARCHAR(36) NULL,
    MODIFY `estudante_id` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `turma` MODIFY `curso_id` VARCHAR(36) NOT NULL DEFAULT 'c2d21545-c4f2-4f32-befc-245d41db94cb';

-- CreateTable
CREATE TABLE `Departamento` (
    `id` VARCHAR(36) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Departamento_id_key`(`id`),
    UNIQUE INDEX `Departamento_codigo_key`(`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professor` (
    `id` VARCHAR(36) NOT NULL,
    `numero_processo` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `departamento_id` VARCHAR(36) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Professor_id_key`(`id`),
    UNIQUE INDEX `Professor_numero_processo_key`(`numero_processo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Naturalidade_professor_id_key` ON `Naturalidade`(`professor_id`);

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_estudante_id_fkey` FOREIGN KEY (`estudante_id`) REFERENCES `Estudante`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naturalidade` ADD CONSTRAINT `Naturalidade_estudante_id_fkey` FOREIGN KEY (`estudante_id`) REFERENCES `Estudante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naturalidade` ADD CONSTRAINT `Naturalidade_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contato` ADD CONSTRAINT `Contato_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_departamento_id_fkey` FOREIGN KEY (`departamento_id`) REFERENCES `Departamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professor` ADD CONSTRAINT `Professor_departamento_id_fkey` FOREIGN KEY (`departamento_id`) REFERENCES `Departamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
