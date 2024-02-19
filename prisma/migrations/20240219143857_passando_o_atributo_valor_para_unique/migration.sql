/*
  Warnings:

  - A unique constraint covering the columns `[valor]` on the table `Ano_academico` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Ano_academico_valor_key` ON `Ano_academico`(`valor`);
