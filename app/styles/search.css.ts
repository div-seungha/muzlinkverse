import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

const defaultText = {
  fontFamily: "Pretendard",
  color: vars.color.grey2,
};

export const searchFormContainer = style({
  width: 600,
  margin: "0 auto",
  minHeight: "100svh",
  height: "fit-content",
  background: vars.color.background,
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "",
  alignItems: "center",
  position: "relative",
  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});

export const searchTitle = style({
  ...defaultText,
  textAlign: "left",
  fontSize: 20,
  fontWeight: 800,
  color: vars.color.grey1,
  marginBottom: 40,
});

export const searchForm = style({
  width: "100&",
  display: "flex",
  padding: "60px 20px 0",
  flexDirection: "column",
});

export const searchFormText = style({
  fontSize: 14,
  color: vars.color.grey2,
  fontFamily: "Pretendard",
  fontWeight: 400,
  textAlign: "left",
});

export const searchResultTextSecondary = style({
  fontSize: 12,
  color: vars.color.grey2,
  fontFamily: "Pretendard",
  fontWeight: 200,
  textAlign: "center",
});

export const searchInput = style({
  border: `1px solid ${vars.color.primaryBorderColor}`,
  height: 42,
  borderRadius: 8,
  boxSizing: "border-box",
  padding: 12,
  width: "100%",
  "::placeholder": {
    fontSize: 14,
    color: vars.color.primaryBorderColor,
  },
});

export const searchInputButton = style({
  background: vars.color.grey1,
  color: vars.color.white,
  width: 50,
  height: 50,
  marginTop: 20,
  borderRadius: 25,
  boxShadow: "none",
  margin: "20px auto",
  ":hover": {
    background: vars.color.grey1,
    color: vars.color.white,
  },
});

export const searchTrackContainer = style({
  width: "100%",
});

export const searchResultText = style({
  ...defaultText,
  textAlign: "center",
  fontSize: 16,
  fontWeight: 600,
});
