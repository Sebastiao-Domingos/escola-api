/*
  Warnings:

  - You are about to alter the column `status` on the `professor` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `professor` MODIFY `status` ENUM('ativo', 'desativo') NOT NULL DEFAULT 'desativo';
