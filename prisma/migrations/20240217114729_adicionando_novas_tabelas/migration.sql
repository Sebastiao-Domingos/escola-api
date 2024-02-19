/*
  Warnings:

  - You are about to drop the `aluno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `aluno`;

-- CreateTable
CREATE TABLE `Pais` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Pais_id_key`(`id`),
    UNIQUE INDEX `Pais_nome_key`(`nome`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provincia` (
    `id` VARCHAR(36) NOT NULL,
    `pais_id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Provincia_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `id` VARCHAR(36) NOT NULL,
    `provincia_id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Municipio_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` VARCHAR(36) NOT NULL,
    `municipio_id` VARCHAR(36) NOT NULL,
    `estudante_id` VARCHAR(191) NOT NULL,
    `distrito` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `ponto_de_referencia` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Endereco_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estudante` (
    `id` VARCHAR(36) NOT NULL,
    `numero_processo` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `turma_id` VARCHAR(36) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Estudante_id_key`(`id`),
    UNIQUE INDEX `Estudante_numero_processo_key`(`numero_processo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Naturalidade` (
    `id` VARCHAR(36) NOT NULL,
    `naturalidade` VARCHAR(191) NOT NULL,
    `municipio_id` VARCHAR(191) NOT NULL,
    `estudante_id` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `Naturalidade_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contato` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `estudante_id` VARCHAR(36) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Contato_id_key`(`id`),
    UNIQUE INDEX `Contato_valor_key`(`valor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `ano_academico_id` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `Turma_id_key`(`id`),
    UNIQUE INDEX `Turma_nome_key`(`nome`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ano_academico` (
    `id` VARCHAR(36) NOT NULL,
    `valor` INTEGER NOT NULL,

    UNIQUE INDEX `Ano_academico_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Provincia` ADD CONSTRAINT `Provincia_pais_id_fkey` FOREIGN KEY (`pais_id`) REFERENCES `Pais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Municipio` ADD CONSTRAINT `Municipio_provincia_id_fkey` FOREIGN KEY (`provincia_id`) REFERENCES `Provincia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_municipio_id_fkey` FOREIGN KEY (`municipio_id`) REFERENCES `Municipio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_estudante_id_fkey` FOREIGN KEY (`estudante_id`) REFERENCES `Estudante`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estudante` ADD CONSTRAINT `Estudante_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `Turma`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naturalidade` ADD CONSTRAINT `Naturalidade_estudante_id_fkey` FOREIGN KEY (`estudante_id`) REFERENCES `Estudante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contato` ADD CONSTRAINT `Contato_estudante_id_fkey` FOREIGN KEY (`estudante_id`) REFERENCES `Estudante`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_ano_academico_id_fkey` FOREIGN KEY (`ano_academico_id`) REFERENCES `Ano_academico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
