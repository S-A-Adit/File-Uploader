/*
  Warnings:

  - You are about to drop the column `color` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Folder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Folder" DROP COLUMN "color",
DROP COLUMN "description";
