/*
  Warnings:

  - You are about to drop the column `artwork` on the `Song` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[artworkId]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "artwork",
ADD COLUMN     "artworkId" INTEGER;

-- CreateTable
CREATE TABLE "Artwork" (
    "id" SERIAL NOT NULL,
    "s3Url" TEXT NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_id_key" ON "Artwork"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Song_artworkId_key" ON "Song"("artworkId");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE SET NULL ON UPDATE CASCADE;
