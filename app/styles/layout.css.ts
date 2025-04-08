import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";
import { relative } from "path";

export const footerText = style({
  fontFamily: "Pretendard",
  fontSize: 12,
  color: vars.color.grey3,
});

export const footerContainer = style({
  position: "relative",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: vars.color.background,
});

export const footerTooltip = style({
  border: `1px solid red`,
});

export const headerContainer = style({
  width: "100%",
  display: "flex",
  background: vars.color.background,
  justifyContent: "center",
});

export const headerContentWrapper = style({
  width: 620,
  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});
