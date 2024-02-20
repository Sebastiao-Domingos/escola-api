-- AlterTable
ALTER TABLE `turma` ADD COLUMN `curso_id` VARCHAR(36) NOT NULL DEFAULT '',
    ADD COLUMN `turno` VARCHAR(191) NOT NULL DEFAULT 'Manhã';

-- CreateTable
CREATE TABLE `Curso` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Curso_id_key`(`id`),
    UNIQUE INDEX `Curso_nome_key`(`nome`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
