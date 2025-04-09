BEGIN;

-- 1. artist 이름 통일
UPDATE song
SET "artist" = 'Admin.S'
WHERE LOWER("artist") = 'admin.s';

-- 2~4. 중복 병합: 전체 CTE를 한 번에 정의
WITH
normalized AS (
  SELECT
    "id",
    "createdAt",
    "title",
    "artist",
    LOWER("title") AS norm_title,
    LOWER("artist") AS norm_artist,
    "spotifyUrl",
    "appleMusicUrl",
    "youtubeUrl",
    "melonUrl",
    "bugsUrl",
    "naverVibeUrl",
    "floUrl",
    "genieUrl",
    "s3_url",
    "artist_profile_img",
    "artist_profile_img_s3_url",
    "bgColor",
    "releaseDate",
    "popularity",
    "rawArtwork",
    "artworkId"
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
  -- 3. 병합: 나중 행의 데이터를 먼저 생성된 행에 덮어쓰기
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

-- 4. 중복 행 제거
DELETE FROM song
WHERE "id" IN (
  SELECT unnest(all_ids[2:])
  FROM dupes
);

COMMIT;
