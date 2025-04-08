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
  const artists = await prisma.artist.findMany({
    select: { id: true, artistId: true, image: true },
  });

  const failed: { id: number; reason?: string }[] = [];

  for (const artist of artists) {
    if (!artist.image) continue;

    const ext = path.extname(artist.image);
    const key = `artist/artist_${artist.artistId}${ext}`;

    try {
      const s3Url = await downloadAndUploadImage(artist.image, key);

      await prisma.artist.update({
        where: { id: artist.id },
        data: { artist_s3_url: s3Url },
      });

      console.log(`✔ Uploaded artwork for artist ${artist.id}`);
    } catch (error: any) {
      console.error(
        `❌ Failed to upload artwork for artist ${artist.id}`,
        error
      );
      failed.push({ id: artist.id, reason: error.message });
    }
  }

  // Save failed artist IDs to JSON file
  if (failed.length > 0) {
    await fs.writeFile("failed.json", JSON.stringify(failed, null, 2), "utf-8");
  }

  return failed;
};

migrateArtwork()
  .then((failed) => {
    console.log("✅ Migration complete");
    if (failed.length > 0) {
      console.log("❗ Failed to process the following artists:", failed);
    }
  })
  .catch(console.error);
