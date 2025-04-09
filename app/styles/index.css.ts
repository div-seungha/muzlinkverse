import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const indexTitle = style({
  fontFamily: "Pretendard",
  fontWeight: 800,
  color: vars.color.grey1,
  fontSize: 24,
  marginLeft: 20,
  marginBottom: 20,
  marginTop: 60,
  lineHeight: 1.2,
  "@media": {
    "screen and (max-width: 768px)": {
      marginLeft: 0,
    },
  },
});

export const indexSubTitle = style({
  fontFamily: "Pretendard",
  fontWeight: 400,
  color: vars.color.grey2,
  fontSize: 14,
  marginLeft: 40,
  marginBottom: 80,
  textAlign: "left",
  "@media": {
    "screen and (max-width: 768px)": {
      marginLeft: 0,
    },
  },
});

export const indexContainer = style({
  padding: "20px 100px",
  "@media": {
    "screen and (max-width: 768px)": {
      padding: 20,
    },
  },
});

export const songCardWrapper = style({
  width: 400,
  height: 200,
  boxSizing: "border-box",
  display: "flex",
  opacity: 0.8,
  flexWrap: "nowrap",
  filter: "saturate(0%)",
  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
      height: 160,
    },
  },
  ":hover": {
    filter: "saturate(100%)",
    opacity: 1,
  },
});

export const songCardCoverImg = style({
  width: 200,
  height: 200,
  objectFit: "cover",
  "@media": {
    "screen and (max-width: 768px)": {
      width: 160,
      height: 160,
    },
  },
});

export const songCard = style({
  width: 200,
  height: 200,
  padding: 12,
  boxSizing: "border-box",
  "@media": {
    "screen and (max-width: 768px)": {
      width: "calc(100% - 160px)",
      height: 160,
    },
  },
});
