/*
  Warnings:

  - Added the required column `maxScore` to the `ExamGrade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minScore` to the `ExamGrade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamGrade" ADD COLUMN     "maxScore" INTEGER NOT NULL,
ADD COLUMN     "minScore" INTEGER NOT NULL;
