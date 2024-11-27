/*
  Warnings:

  - You are about to drop the column `userId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the `UserResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserResult" DROP CONSTRAINT "UserResult_resultId_fkey";

-- DropForeignKey
ALTER TABLE "UserResult" DROP CONSTRAINT "UserResult_userId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "userId";

-- DropTable
DROP TABLE "UserResult";

-- CreateTable
CREATE TABLE "_UserResults" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserResults_AB_unique" ON "_UserResults"("A", "B");

-- CreateIndex
CREATE INDEX "_UserResults_B_index" ON "_UserResults"("B");

-- AddForeignKey
ALTER TABLE "_UserResults" ADD CONSTRAINT "_UserResults_A_fkey" FOREIGN KEY ("A") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserResults" ADD CONSTRAINT "_UserResults_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
