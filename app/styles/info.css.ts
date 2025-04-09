import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";
import { defaultContainer, defaultText } from "./layout.css";
import { searchInput } from "./search.css";

export const contentContainer = style({
  ...defaultContainer,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  //   justifyContent: "",
  alignItems: "center",
  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});

export const searchTextarea = style({
  border: `1px solid ${vars.color.primaryBorderColor}`,
  borderRadius: 8,
  boxSizing: "border-box",
  padding: 12,
  width: "100%",
  "::placeholder": {
    fontSize: 14,
    color: vars.color.primaryBorderColor,
  },
  height: 300,
});

export const submitContainer = style({
  width: "100%",
  height: "calc(100svh - 120px)",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: 20,
  alignItems: "center",
});

export const submitText = style({
  ...defaultText,
  fontWeight: 500,
  textAlign: "center",
});

export const returnButton = style({
  background: vars.color.white,
  border: `1px solid ${vars.color.grey1}`,
  color: vars.color.grey1,
  width: 50,
  height: 50,
  marginTop: 20,
  borderRadius: 25,
  boxShadow: "none",
  margin: "20px auto",
  ":hover": {
    background: vars.color.white,
    color: vars.color.grey1,
  },
});
