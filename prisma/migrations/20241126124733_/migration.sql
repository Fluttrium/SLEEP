/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Disease` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Disease_title_key" ON "Disease"("title");
