/*
  Warnings:

  - You are about to drop the `_BlockToHashtag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `block_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `block_links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `block_quotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `block_texts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlockToHashtag" DROP CONSTRAINT "_BlockToHashtag_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlockToHashtag" DROP CONSTRAINT "_BlockToHashtag_B_fkey";

-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_dayId_fkey";

-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_reblockSourceId_fkey";

-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_userId_fkey";

-- DropTable
DROP TABLE "_BlockToHashtag";

-- DropTable
DROP TABLE "block_images";

-- DropTable
DROP TABLE "block_links";

-- DropTable
DROP TABLE "block_quotes";

-- DropTable
DROP TABLE "block_texts";

-- DropTable
DROP TABLE "blocks";

-- CreateTable
CREATE TABLE "pieces" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "dayId" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "originalPieceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "pieces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pieces_userId_idx" ON "pieces"("userId");

-- CreateIndex
CREATE INDEX "pieces_dayId_position_idx" ON "pieces"("dayId", "position");

-- CreateIndex
CREATE INDEX "pieces_originalPieceId_idx" ON "pieces"("originalPieceId");

-- CreateIndex
CREATE INDEX "pieces_createdAt_idx" ON "pieces"("createdAt");

-- AddForeignKey
ALTER TABLE "pieces" ADD CONSTRAINT "pieces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieces" ADD CONSTRAINT "pieces_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieces" ADD CONSTRAINT "pieces_originalPieceId_fkey" FOREIGN KEY ("originalPieceId") REFERENCES "pieces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
