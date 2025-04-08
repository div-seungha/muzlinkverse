import { TinyColor } from "@ctrl/tinycolor";
import tinycolor from "tinycolor2";

export const getGradientColors = (hex: string): string[] => {
  const color = new TinyColor(hex);

  // 색상 조화: 유사색 + 밝기 조절로 부드러운 그라데이션
  const analogous = color.analogous(5, 2); // 5개, 각도 간격 12도
  return analogous.map((c) => c.toHexString());
};

export const getTextColor = (bgColor: string, path?: string) => {
  if (!bgColor) {
    if (path === "/sunrise" || path === "/" || path === "/search") {
      return "#ffffff";
    }
    return "#18191a";
  }

  const r = parseInt(bgColor.slice(0, 2), 16);
  const g = parseInt(bgColor.slice(2, 4), 16);
  const b = parseInt(bgColor.slice(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#18191a" : "#fff";
};

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const c1 = tinycolor(hex1).toRgb();
  const c2 = tinycolor(hex2).toRgb();
  const L1 = getLuminance(c1.r, c1.g, c1.b);
  const L2 = getLuminance(c2.r, c2.g, c2.b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

export const findMostContrastingColor = (baseColor: string): string => {
  const candidates = Array.from({ length: 100 }, () =>
    tinycolor.random().toHexString()
  );
  let bestContrast = 0;
  let bestColor = candidates[0];

  for (const color of candidates) {
    const contrast = contrastRatio(baseColor, color);
    if (contrast > bestContrast) {
      bestContrast = contrast;
      bestColor = color;
    }
  }

  return bestColor;
};
