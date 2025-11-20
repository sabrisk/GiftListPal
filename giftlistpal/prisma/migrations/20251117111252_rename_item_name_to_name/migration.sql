/*
  Warnings:

  - You are about to drop the column `item_name` on the `gifts` table. All the data in the column will be lost.
  - Added the required column `name` to the `gifts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gifts" DROP COLUMN "item_name",
ADD COLUMN     "name" VARCHAR(150) NOT NULL;
