import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

const defaultBox = {
  border: `1px solid ${vars.color.primaryBorderColor}`,
  borderRadius: 12,
  padding: "16px 12px",
  fontSize: 16,
  fontWeight: 400,
  fontFamily: "Pretendard",
  //   boxSizing: "border-box",
};

const defaultText = {
  color: vars.color.textPrimary,
  fontWeight: 400,
  RiFontFamily: "Pretendard",
  fontSize: 16,
  lineHeight: 1.2,
};

const defaultStreamingButton = {
  ...defaultBox,
  ...defaultText,
  border: 0,
  borderRadius: 8,
  fontWeight: 500,
  boxShadow: "none",
  transition: "none",
  display: "flex",
  justifyContent: "center",

  ":hover": {
    background: vars.color.background,
  },
};

export const artworkWrapper = style({
  ...defaultBox,
  padding: 12,
  boxSizing: "border-box",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
});

export const artworkImg = style({
  ...defaultBox,
  width: 180,
  height: 180,
  boxShadow: "none",
  padding: 0,
  border: 0,
  boxSizing: "border-box",
  borderRadius: 8,
});

export const trackInfoContainer = style({
  ...defaultBox,
  boxSizing: "border-box",
  width: "100%",
  marginBottom: 20,
});

export const trackInfo = style({
  color: vars.color.textPrimary,
});

export const trackTitle = style({
  ...defaultText,
  fontSize: 32,
  fontWeight: 800,
});

export const trackArtist = style({
  ...defaultText,
  fontWeight: 600,
});

export const trackReleaseDate = style({
  ...defaultText,
  fontSize: 12,
  fontWeight: 200,
  margin: "20px 0 0",
  color: vars.color.grey2,
});

export const trackContainer = style({
  width: 600,
  margin: "0 auto",
  minHeight: "100svh",
  height: "fit-content",
  padding: "60px 20px",
  background: vars.color.background,
  display: "flex",
  flexDirection: "column",
  //   justifyContent: "",
  alignItems: "center",
  position: "relative",
  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});

export const buttonMelon = style({
  ...defaultStreamingButton,
  background: vars.color.melon,
  color: vars.color.background,
  border: `1px solid ${vars.color.melon}`,
  ":hover": {
    color: vars.color.melon,
  },
});

export const buttonApple = style({
  ...defaultStreamingButton,
  background: vars.color.apple,
  color: vars.color.background,
  border: `1px solid ${vars.color.apple}`,
  ":hover": {
    color: vars.color.apple,
  },
});

export const buttonSpotify = style({
  ...defaultStreamingButton,
  background: vars.color.spotify,
  color: vars.color.background,
  border: `1px solid ${vars.color.spotify}`,
  ":hover": {
    color: vars.color.spotify,
    border: `1px solid ${vars.color.spotify}`,
  },
});

export const buttonYoutube = style({
  ...defaultStreamingButton,
  background: vars.color.white,
  color: vars.color.youtube,
  border: `1px solid ${vars.color.youtube}`,
  ":hover": {
    color: vars.color.white,
    background: vars.color.youtube,
    border: `1px solid ${vars.color.youtube}`,
  },
});

export const buttonYoutubeMusic = style({
  ...defaultStreamingButton,
  background: vars.color.black,
  color: vars.color.youtube,
  border: `1px solid ${vars.color.black}`,
  ":hover": {
    color: vars.color.white,
    background: vars.color.youtube,
    border: `1px solid ${vars.color.youtube}`,
  },
});

export const buttonBugs = style({
  ...defaultStreamingButton,
  background: vars.color.bugs,
  color: vars.color.background,
  border: `1px solid ${vars.color.bugs}`,
  ":hover": {
    color: vars.color.bugs,
  },
});

export const buttonNaverVibe = style({
  ...defaultStreamingButton,
  background: vars.color.naverVibe,
  color: vars.color.background,
  border: `1px solid ${vars.color.naverVibe}`,
  ":hover": {
    color: vars.color.naverVibe,
  },
});

export const buttonFlo = style({
  ...defaultStreamingButton,
  background: vars.color.flo,
  color: vars.color.background,
  border: `1px solid ${vars.color.flo}`,
  ":hover": {
    color: vars.color.flo,
  },
});

export const trackLinkButtonContainer = style({
  ...defaultBox,
  width: "100%",
  display: "flex",
  padding: 16,
  flexDirection: "column",
  gap: 20,
});

export const trackShareSnackbar = style({
  background: vars.color.grey1,
  color: vars.color.white,
  fontSize: 14,
  fontWeight: 400,
  width: 600,
  borderRadius: 8,
  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});

export const trackShare = style({
  width: 50,
  height: 50,
  borderRadius: 25,
  border: `1px solid ${vars.color.grey1}`,
  boxShadow: "none",
  background: vars.color.grey1,
  margin: "20px auto",
  transition: "none",
  ":hover": {
    background: vars.color.grey1,
  },
});

export const trackRelatedSongsContainer = style({
  ...defaultBox,
  fontSize: 16,
  fontWeight: 700,
  fontFamily: "Pretendard",
  width: "100%",
  marginTop: 20,
  color: vars.color.grey2,
});

export const trackRelatedSongs = style({
  ...defaultBox,
  marginTop: 20,
});

export const trackRelatedSongItem = style({
  ...defaultBox,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row-reverse",
  borderRadius: 8,
  padding: 16,
  marginTop: 12,
});

export const trackRelatedSongItemImg = style({
  width: 80,
  height: 80,
  borderRadius: 4,
  objectFit: "cover",
});

export const trackRelatedSongItemTitle = style({
  ...defaultText,
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 8,
  color: vars.color.grey2,
  textAlign: "left",
});

export const trackRelatedSongItemArtist = style({
  ...defaultText,
  fontSize: 12,
  fontWeight: 300,
  marginBottom: 4,
  color: vars.color.grey2,
  textAlign: "left",
});

export const trackRelatedSongItemReleaseDate = style({
  ...defaultText,
  fontSize: 10,
  fontWeight: 200,
  color: vars.color.grey2,
  textAlign: "left",
});
