/*
  Warnings:

  - You are about to drop the column `email` on the `administrador` table. All the data in the column will be lost.
  - You are about to drop the column `turma_id` on the `administrador` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Administrador_email_key` ON `administrador`;

-- AlterTable
ALTER TABLE `administrador` DROP COLUMN `email`,
    DROP COLUMN `turma_id`;
