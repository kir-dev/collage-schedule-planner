/*
  Warnings:

  - The values [OPEN] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - Added the required column `color` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Priority" ADD VALUE 'URGENT';

-- AlterEnum
BEGIN;
ALTER TYPE "Status" ADD VALUE 'WAITING_FOR_REVIEW';
ALTER TYPE "Status" RENAME VALUE 'OPEN' TO 'NOT_STARTED';
COMMIT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#000000';

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
ADD COLUMN     "endDate" DATE,
ADD COLUMN     "endTime" TIME,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "startDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startTime" TIME,
ALTER COLUMN "priority" SET DEFAULT 'MEDIUM',
ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED';
