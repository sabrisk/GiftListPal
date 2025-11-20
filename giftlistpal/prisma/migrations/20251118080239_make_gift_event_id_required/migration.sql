/*
  Warnings:

  - Made the column `event_id` on table `gifts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."gifts" DROP CONSTRAINT "gifts_event_id_fkey";

-- AlterTable
ALTER TABLE "gifts" ALTER COLUMN "event_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
