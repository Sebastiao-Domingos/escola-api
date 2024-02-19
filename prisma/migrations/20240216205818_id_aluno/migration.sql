/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Aluno_id_key` ON `Aluno`(`id`);
