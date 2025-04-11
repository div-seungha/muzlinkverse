BEGIN;

-- 1~4. title + artist 기준 중복 병합 처리
WITH
normalized AS (
  SELECT
    *,
    TRIM(LOWER("title")) AS norm_title,
    TRIM(LOWER("artist")) AS norm_artist
  FROM song
),
dupes AS (
  SELECT
    norm_title,
    norm_artist,
    MIN("id") AS keep_id,
    ARRAY_AGG("id" ORDER BY "createdAt") AS all_ids
  FROM normalized
  GROUP BY norm_title, norm_artist
  HAVING COUNT(*) > 1
),
updates AS (
  SELECT
    d.keep_id,
    s."id" AS overwrite_id,
    s.*
  FROM dupes d
  JOIN LATERAL unnest(d.all_ids[2:]) AS rem_id ON TRUE
  JOIN normalized s ON s."id" = rem_id
),
update_result AS (
  UPDATE song target
  SET
    "spotifyUrl" = COALESCE(u."spotifyUrl", target."spotifyUrl"),
    "appleMusicUrl" = COALESCE(u."appleMusicUrl", target."appleMusicUrl"),
    "youtubeUrl" = COALESCE(u."youtubeUrl", target."youtubeUrl"),
    "melonUrl" = COALESCE(u."melonUrl", target."melonUrl"),
    "bugsUrl" = COALESCE(u."bugsUrl", target."bugsUrl"),
    "naverVibeUrl" = COALESCE(u."naverVibeUrl", target."naverVibeUrl"),
    "floUrl" = COALESCE(u."floUrl", target."floUrl"),
    "genieUrl" = COALESCE(u."genieUrl", target."genieUrl"),
    "s3_url" = COALESCE(u."s3_url", target."s3_url"),
    "artist_profile_img" = COALESCE(u."artist_profile_img", target."artist_profile_img"),
    "artist_profile_img_s3_url" = COALESCE(u."artist_profile_img_s3_url", target."artist_profile_img_s3_url"),
    "bgColor" = COALESCE(u."bgColor", target."bgColor"),
    "releaseDate" = COALESCE(u."releaseDate", target."releaseDate"),
    "popularity" = COALESCE(u."popularity", target."popularity"),
    "rawArtwork" = COALESCE(u."rawArtwork", target."rawArtwork"),
    "artworkId" = COALESCE(u."artworkId", target."artworkId")
  FROM updates u
  WHERE target."id" = u.keep_id
)

-- 4. 병합된 중복 행 제거
DELETE FROM song
WHERE "id" IN (
  SELECT unnest(all_ids[2:])
  FROM dupes
);

COMMIT;
