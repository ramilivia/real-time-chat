/*
  Warnings:

  - Added the required column `password` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `author` ADD COLUMN `password` VARCHAR(191) NOT NULL;
