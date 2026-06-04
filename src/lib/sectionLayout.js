// Single source of truth for section height constants and positioning utilities.
// All three overlay/editor/teki components import from here — never duplicate these values.

export const SECTION_H = {
  header: { built: 62,  unbuilt: 116 },
  hero:   { built: 320, unbuilt: 180 },
  footer: { built: 110, unbuilt: 100 },
};

export const SECTION_META = {
  header: { label: "Header",       color: "#2cbaff" },
  hero:   { label: "Hero Section", color: "#8b5cf6" },
  footer: { label: "Footer",       color: "#10b981" },
};

export function getSectionHeight(sections, key) {
  return sections[key]?.built ? SECTION_H[key].built : SECTION_H[key].unbuilt;
}

export function buildSectionBounds(sections, iframeTop) {
  const hH = getSectionHeight(sections, "header");
  const rH = getSectionHeight(sections, "hero");
  const fH = getSectionHeight(sections, "footer");
  return {
    header: { top: iframeTop,           height: hH, ...SECTION_META.header },
    hero:   { top: iframeTop + hH,      height: rH, ...SECTION_META.hero   },
    footer: { top: iframeTop + hH + rH, height: fH, ...SECTION_META.footer },
  };
}
