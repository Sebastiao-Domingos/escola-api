-- CreateTable
CREATE TABLE `Administrador` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Administrador_id_key`(`id`),
    UNIQUE INDEX `Administrador_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `distrito` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `ponto_de_referencia` VARCHAR(191) NOT NULL,
    `estudante_id` VARCHAR(36) NULL,
    `professor_id` VARCHAR(36) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Endereco_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estudante` (
    `id` VARCHAR(36) NOT NULL,
    `numero_processo` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `turma_id` VARCHAR(36) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Estudante_id_key`(`id`),
    UNIQUE INDEX `Estudante_numero_processo_key`(`numero_processo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Naturalidade` (
    `id` VARCHAR(36) NOT NULL,
    `naturalidade` VARCHAR(191) NOT NULL,
    `municipio_id` VARCHAR(191) NOT NULL,
    `estudante_id` VARCHAR(36) NULL,
    `professor_id` VARCHAR(36) NULL,

    UNIQUE INDEX `Naturalidade_id_key`(`id`),
    UNIQUE INDEX `Naturalidade_estudante_id_key`(`estudante_id`),
    UNIQUE INDEX `Naturalidade_professor_id_key`(`professor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contato` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `estudante_id` VARCHAR(36) NULL,
    `professor_id` VARCHAR(36) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Contato_id_key`(`id`),
    UNIQUE INDEX `Contato_valor_key`(`valor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `turno` VARCHAR(191) NOT NULL DEFAULT 'Manhã',
    `curso_id` VARCHAR(36) NOT NULL,
    `ano_academico_id` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `Turma_id_key`(`id`),
    UNIQUE INDEX `Turma_nome_key`(`nome`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ano_academico` (
    `id` VARCHAR(36) NOT NULL,
    `valor` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Ano_academico_id_key`(`id`),
    UNIQUE INDEX `Ano_academico_valor_key`(`valor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `departamento_id` VARCHAR(36) NULL,

    UNIQUE INDEX `Curso_id_key`(`id`),
    UNIQUE INDEX `Curso_nome_key`(`nome`),
    UNIQUE INDEX `Curso_departamento_id_key`(`departamento_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento` (
    `id` VARCHAR(36) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Departamento_id_key`(`id`),
    UNIQUE INDEX `Departamento_codigo_key`(`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professor` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Professor_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TurmaProfessor` (
    `id` VARCHAR(36) NOT NULL,
    `turma_id` VARCHAR(191) NOT NULL,
    `professor_id` VARCHAR(191) NOT NULL,
    `disciplina_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TurmaProfessor_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disciplina` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `carga` INTEGER NOT NULL,

    UNIQUE INDEX `Disciplina_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Imagens` (
    `id` VARCHAR(36) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `estudante_id` VARCHAR(36) NULL,
    `professor_id` VARCHAR(36) NULL,

    UNIQUE INDEX `Imagens_id_key`(`id`),
    UNIQUE INDEX `Imagens_estudante_id_key`(`estudante_id`),
    UNIQUE INDEX `Imagens_professor_id_key`(`professor_id`)
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
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estudante` ADD CONSTRAINT `Estudante_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `Turma`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naturalidade` ADD CONSTRAINT `Naturalidade_estudante_id_fkey` FOREIGN KEY (`estudante_id`) REFERENCES `Estudante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naturalidade` ADD CONSTRAINT `Naturalidade_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contato` ADD CONSTRAINT `Contato_estudante_id_fkey` FOREIGN KEY (`estudante_id`) REFERENCES `Estudante`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contato` ADD CONSTRAINT `Contato_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_ano_academico_id_fkey` FOREIGN KEY (`ano_academico_id`) REFERENCES `Ano_academico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_departamento_id_fkey` FOREIGN KEY (`departamento_id`) REFERENCES `Departamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurmaProfessor` ADD CONSTRAINT `TurmaProfessor_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurmaProfessor` ADD CONSTRAINT `TurmaProfessor_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `Turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurmaProfessor` ADD CONSTRAINT `TurmaProfessor_disciplina_id_fkey` FOREIGN KEY (`disciplina_id`) REFERENCES `Disciplina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imagens` ADD CONSTRAINT `Imagens_estudante_id_fkey` FOREIGN KEY (`estudante_id`) REFERENCES `Estudante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imagens` ADD CONSTRAINT `Imagens_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
