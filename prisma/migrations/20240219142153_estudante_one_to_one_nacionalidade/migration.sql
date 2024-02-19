/*
  Warnings:

  - A unique constraint covering the columns `[estudante_id]` on the table `Naturalidade` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Naturalidade_estudante_id_key` ON `Naturalidade`(`estudante_id`);
