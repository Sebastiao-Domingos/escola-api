-- CreateTable
CREATE TABLE `Aluno` (
    `id` VARCHAR(36) NOT NULL,
    `numero_processo` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `Aluno_numero_processo_key`(`numero_processo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
