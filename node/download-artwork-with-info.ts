import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs/promises";
import { prisma } from "../app/.server/db";

const s3 = new S3Client({ region: "ap-northeast-2" });
const BUCKET = "muzlinkverse";

const downloadAndUploadImage = async (imageUrl: string, key: string) => {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

  const contentType = response.headers["content-type"] || "image/jpeg";

  const uploadCommand = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: response.data,
    ContentType: contentType,
  });

  await s3.send(uploadCommand);

  return `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${key}`;
};

const migrateArtwork = async () => {
  const songs = await prisma.song.findMany({
    select: { id: true, rawArtwork: true, title: true, artist: true },
  });

  const failed: { id: number; reason?: string }[] = [];

  for (const song of songs) {
    if (!song.rawArtwork) continue;

    const ext = path.extname(song.rawArtwork).split("?")[0] || ".jpg";
    const key = `album-artwork/${song.id}${ext}`;

    try {
      const s3Url = await downloadAndUploadImage(song.rawArtwork, key);

      await prisma.artwork_s3.create({
        data: {
          s3_url: s3Url,
          song_id: song.id,
          title: song.title,
          artist: song.artist,
        },
      });

      console.log(`✔ Uploaded artwork for song ${song.id}`);
    } catch (error) {
      console.error(`❌ Failed to upload artwork for song ${song.id}`, error);
      failed.push({ id: song.id, reason: error.message });
    }
  }

  // Save failed song IDs to JSON file
  if (failed.length > 0) {
    await fs.writeFile("failed.json", JSON.stringify(failed, null, 2), "utf-8");
  }

  return failed;
};

migrateArtwork()
  .then((failed) => {
    console.log("✅ Migration complete");
    if (failed.length > 0) {
      console.log("❗ Failed to process the following songs:", failed);
    }
  })
  .catch(console.error);
