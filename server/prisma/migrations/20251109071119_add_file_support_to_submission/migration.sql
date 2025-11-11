-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "fileUrl" TEXT,
ALTER COLUMN "content" DROP NOT NULL;
