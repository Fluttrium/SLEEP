-- DropForeignKey
ALTER TABLE "Disease" DROP CONSTRAINT "Disease_testId_fkey";

-- AlterTable
ALTER TABLE "Disease" ALTER COLUMN "testId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;
