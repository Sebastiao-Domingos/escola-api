-- CreateTable
CREATE TABLE `TurmaProfessor` (
    `id` VARCHAR(36) NOT NULL,
    `turma_id` VARCHAR(191) NOT NULL,
    `professor_id` VARCHAR(191) NOT NULL,
    `disciplina_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TurmaProfessor_id_key`(`id`),
    UNIQUE INDEX `TurmaProfessor_disciplina_id_key`(`disciplina_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disciplina` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `carga` INTEGER NOT NULL,

    UNIQUE INDEX `Disciplina_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TurmaProfessor` ADD CONSTRAINT `TurmaProfessor_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurmaProfessor` ADD CONSTRAINT `TurmaProfessor_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `Turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurmaProfessor` ADD CONSTRAINT `TurmaProfessor_disciplina_id_fkey` FOREIGN KEY (`disciplina_id`) REFERENCES `Disciplina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
