/*
  Warnings:

  - The primary key for the `Announcement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Announcement` table. All the data in the column will be lost.
  - The primary key for the `Assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `startDate` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Assignment` table. All the data in the column will be lost.
  - The primary key for the `Attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Exam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endTime` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Exam` table. All the data in the column will be lost.
  - The primary key for the `Lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Result` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birthday` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[supervisorId]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Made the column `classId` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `date` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Day" ADD VALUE 'SATURDAY';
ALTER TYPE "Day" ADD VALUE 'SUNDAY';

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_classId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_classId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_classId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_examId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropIndex
DROP INDEX "Class_name_key";

-- DropIndex
DROP INDEX "Teacher_username_key";

-- Update existing data with default values
UPDATE "Announcement" SET "content" = "description" WHERE "content" IS NULL;
UPDATE "Assignment" SET "name" = "title", "content" = 'Default content' WHERE "name" IS NULL;
UPDATE "Exam" SET "name" = "title", "date" = "startTime" WHERE "name" IS NULL;
UPDATE "Result" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "updatedAt" IS NULL;
UPDATE "Student" SET "password" = 'defaultpassword' WHERE "password" IS NULL;
UPDATE "Teacher" SET "password" = 'defaultpassword' WHERE "password" IS NULL;

-- AlterTable
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_pkey",
ADD COLUMN     "content" TEXT NOT NULL DEFAULT 'Default content',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT;

-- Update Announcement data
UPDATE "Announcement" SET "content" = "description" WHERE "description" IS NOT NULL;

-- Continue Announcement changes
ALTER TABLE "Announcement"
DROP COLUMN "date",
DROP COLUMN "description",
ADD CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Announcement_id_seq";

-- AlterTable
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_pkey",
ADD COLUMN     "content" TEXT NOT NULL DEFAULT 'Default content',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Default name',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "lessonId" SET DATA TYPE TEXT;

-- Update Assignment data
UPDATE "Assignment" SET "name" = "title", "content" = 'Default content' WHERE "title" IS NOT NULL;

-- Continue Assignment changes
ALTER TABLE "Assignment"
DROP COLUMN "startDate",
DROP COLUMN "title",
ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Assignment_id_seq";

-- AlterTable
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "lessonId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Attendance_id_seq";

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Class_id_seq";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET NOT NULL,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Event_id_seq";

-- AlterTable
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_pkey",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Default exam',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "lessonId" SET DATA TYPE TEXT;

-- Update Exam data
UPDATE "Exam" SET "name" = "title", "date" = "startTime" WHERE "title" IS NOT NULL AND "startTime" IS NOT NULL;

-- Continue Exam changes
ALTER TABLE "Exam"
DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "title",
ADD CONSTRAINT "Exam_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Exam_id_seq";

-- AlterTable
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Lesson_id_seq";

-- AlterTable
ALTER TABLE "Result" DROP CONSTRAINT "Result_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "examId" SET DATA TYPE TEXT,
ALTER COLUMN "assignmentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Result_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Result_id_seq";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'defaultpassword',
ALTER COLUMN "classId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "birthday",
DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "status",
DROP COLUMN "username",
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'defaultpassword';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sex" "UserSex";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "_ClassTeachers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassTeachers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClassTeachers_B_index" ON "_ClassTeachers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Class_supervisorId_key" ON "Class"("supervisorId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassTeachers" ADD CONSTRAINT "_ClassTeachers_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassTeachers" ADD CONSTRAINT "_ClassTeachers_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
