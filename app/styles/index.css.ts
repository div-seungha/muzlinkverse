import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const indexTitle = style({
  fontFamily: "Pretendard",
  fontWeight: 800,
  color: vars.color.grey1,
  fontSize: 24,
  marginLeft: 40,
  marginBottom: 20,
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
