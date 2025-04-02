-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "artwork" TEXT,
    "bgColor" TEXT,
    "releaseDate" TEXT,
    "spotifyUrl" TEXT,
    "appleMusicUrl" TEXT,
    "youtubeUrl" TEXT,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);
