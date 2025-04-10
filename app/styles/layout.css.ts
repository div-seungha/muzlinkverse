import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";
import { searchInput } from "./search.css";

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
  position: "relative",
  zIndex: 100,
  marginLeft: 80,
  padding: 12,
  boxSizing: "border-box",
});

export const headerContentWrapper = style({
  width: 620,
  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});

export const defaultContainer = {
  width: 600,
  margin: "0 auto",
  minHeight: "100svh",
  height: "fit-content",
  padding: "60px 20px",
  background: vars.color.background,
};

export const defaultBox = {
  border: `1px solid ${vars.color.primaryBorderColor}`,
  borderRadius: 12,
  padding: "16px 12px",
  fontSize: 16,
  fontWeight: 400,
  fontFamily: "Pretendard",
  //   boxSizing: "border-box",
};

export const defaultText = {
  color: vars.color.textPrimary,
  fontWeight: 400,
  RiFontFamily: "Pretendard",
  fontSize: 16,
  lineHeight: 1.2,
};

export const navContainer = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: 80,
  borderRight: `1px solid ${vars.color.primaryBorderColor}`,
  height: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media": {
    "screen and (max-width: 768px)": {
      display: "none",
    },
  },
});

export const nav = style({
  width: "100%",
  height: 400,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const navItemWrapper = style({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export const navItem = style({
  padding: 16,
  width: 70,
  height: 70,
});

export const speedDialButton = style({
  position: "fixed",
  bottom: 20,
  left: 20,
  width: 50,
  height: 50,
  borderRadius: 25,
  background: vars.color.white,
  border: `1px solid ${vars.color.grey2}`,
});

export const navMobileContainer = style({
  position: "fixed",
  bottom: 20,
  left: 20,
  zIndex: 10000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media": {
    "screen and (min-width: 769px)": {
      display: "none",
    },
  },
});

export const navMobileItem = style({
  padding: 8,
  width: 36,
  height: 36,
  borderRadius: 25,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: vars.color.background,
  border: `1px solid ${vars.color.primaryBorderColor}`,
  boxSizing: "border-box",
  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.05)",
});

export const navMobileItemWrapper = style({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const navEventContainer = style({
  position: "fixed",
  bottom: 20,
  left: 20,
  zIndex: 10000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const navEventItemWrapper = style({
  justifyContent: "center",
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const navEventLabelItem = style({
  padding: 8,
  width: 200,
  height: 36,
  fontSize: 12,
  fontFamily: "Pretendard",
  color: vars.color.grey2,
  borderRadius: 25,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: vars.color.background,
  border: `1px solid ${vars.color.primaryBorderColor}`,
  boxSizing: "border-box",
  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.05)",
});
