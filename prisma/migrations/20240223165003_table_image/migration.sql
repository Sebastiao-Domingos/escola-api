-- CreateTable
CREATE TABLE `Imagens` (
    `id` VARCHAR(36) NOT NULL,
    `path` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Imagens_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
