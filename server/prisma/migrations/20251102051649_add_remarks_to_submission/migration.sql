/*
  Warnings:

  - You are about to drop the column `reamrks` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "reamrks",
ADD COLUMN     "remarks" TEXT;
