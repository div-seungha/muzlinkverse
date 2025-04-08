-- CreateTable
CREATE TABLE "artist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "artistUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "genres" TEXT[],
    "href" TEXT,
    "popularity" INTEGER,
    "song_id" INTEGER NOT NULL,
    "image" TEXT,
    "artist_s3_url" TEXT,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artwork_s3" (
    "s3_url" TEXT,
    "title" TEXT,
    "artist" TEXT,
    "song_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "artwork_s3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "melon_crawling" (
    "song_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artists" TEXT[],
    "url" TEXT NOT NULL,

    CONSTRAINT "melon_crawling_pkey" PRIMARY KEY ("song_id")
);

-- CreateTable
CREATE TABLE "song" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "bgColor" TEXT,
    "releaseDate" TEXT,
    "spotifyUrl" TEXT,
    "appleMusicUrl" TEXT,
    "youtubeUrl" TEXT,
    "popularity" INTEGER,
    "artworkId" INTEGER,
    "rawArtwork" TEXT,
    "melonUrl" TEXT,
    "bugsUrl" TEXT,
    "naverVibeUrl" TEXT,
    "floUrl" TEXT,
    "genieUrl" TEXT,
    "s3_url" TEXT,
    "artist_profile_img" TEXT,
    "artist_profile_img_s3_url" TEXT,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "song_artists" (
    "song_id" INTEGER NOT NULL,
    "artist_id" INTEGER NOT NULL,

    CONSTRAINT "song_artists_pkey" PRIMARY KEY ("song_id","artist_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artist_artistId_key" ON "artist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Song_artworkId_key" ON "song"("artworkId");

-- CreateIndex
CREATE UNIQUE INDEX "Song_title_artist_key" ON "song"("title", "artist");

-- CreateIndex
CREATE UNIQUE INDEX "song_releaseDate_id_key" ON "song"("releaseDate", "id");

-- AddForeignKey
ALTER TABLE "song_artists" ADD CONSTRAINT "song_artists_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "song_artists" ADD CONSTRAINT "song_artists_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

