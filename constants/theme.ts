export type Theme = {
  // ── App background ───────────────────────────────────────────────────────
  background: string; // Main screen bg

  // ── Surfaces ─────────────────────────────────────────────────────────────
  surface: string; // Cards, modals, sheets
  surfaceRaised: string; // Elevated surfaces (tab bar, date strip bg)

  // ── Accent / Brand ────────────────────────────────────────────────────────
  accent: string; // Primary brand purple — active icons, selected date pill
  accentLight: string; // Light tint of accent — inactive date pill bg, subtle highlights
  accentText: string; // Text ON accent-colored surfaces (always white / near-white)

  // ── FAB ──────────────────────────────────────────────────────────────────
  fabBg: string; // Floating action button background
  fabIcon: string; // "+" icon color on FAB

  // ── Header ───────────────────────────────────────────────────────────────
  headerTitle: string; // "Today" heading
  headerSubtitle: string; // Motivational quote

  // ── Date strip ───────────────────────────────────────────────────────────
  dateInactiveBg: string; // Inactive date pill background
  dateActiveBg: string; // Active/selected date pill background  →  accent
  dateInactiveText: string; // Inactive day/date text
  dateActiveText: string; // Active day/date text  →  accentText

  // ── Task cards ────────────────────────────────────────────────────────────
  // Each category gets a soft tinted bg so cards feel warm, not clinical.
  cardDefault: string; // Fallback / uncategorised card
  cardFamily: string; // "Family" task card tint   (soft purple)
  cardHealth: string; // "Health" task card tint   (soft green)
  cardLearning: string; // "Learning" task card tint (soft amber)
  cardSelfCare: string; // "Self-care" task card tint(soft blue)

  cardTitle: string; // Task name text
  cardTime: string; // Time range text (e.g. "13:30 - 14:00")
  cardDuration: string; // Duration text  (e.g. "30 Minutes")

  // ── Category badges (pill inside each card) ──────────────────────────────
  badgeFamilyBg: string;
  badgeFamilyText: string;

  badgeHealthBg: string;
  badgeHealthText: string;

  badgeLearningBg: string;
  badgeLearningText: string;

  badgeSelfCareBg: string;
  badgeSelfCareText: string;

  // ── Checkbox ─────────────────────────────────────────────────────────────
  checkboxBorder: string; // Border when unchecked
  checkboxCheckedBg: string; // Fill when checked
  checkboxTick: string; // Tick / checkmark color

  // ── Tab bar ──────────────────────────────────────────────────────────────
  tabBarBg: string; // Pill card background
  tabIconActive: string; // Active tab icon tint
  tabIconInactive: string; // Inactive tab icon tint

  // ── Typography ───────────────────────────────────────────────────────────
  text: string; // Primary body text
  textMuted: string; // Secondary / muted text

  // ── Structural ────────────────────────────────────────────────────────────
  border: string; // Dividers, subtle borders
};

// ─────────────────────────────────────────────────────────────────────────────
//  LIGHT THEME
//  Base: very soft lavender-white (#F8F7FF) — cleaner than current loud purple
//  Accent: rich indigo-purple (#6C47FF)
//  Cards: one tint per category, all desaturated so text pops
// ─────────────────────────────────────────────────────────────────────────────

export const lightTheme: Theme = {
  background: "#F8F7FF", // Barely-there lavender — not distracting

  surface: "#FFFFFF",
  surfaceRaised: "#FFFFFF",

  accent: "#6C47FF", // Strong indigo-purple
  accentLight: "#EAE4FF", // Very soft purple tint for inactive date pills
  accentText: "#FFFFFF",

  fabBg: "#FF5A5F", // Coral-red — eye-catching, unchanged
  fabIcon: "#FFFFFF",

  headerTitle: "#1A1635", // Deep navy-black for contrast
  headerSubtitle: "#8A8A9A", // Muted purple-gray

  dateInactiveBg: "#EAE4FF",
  dateActiveBg: "#6C47FF",
  dateInactiveText: "#8A8A9A",
  dateActiveText: "#FFFFFF",

  // Card tints — each from a DIFFERENT color family so categories feel distinct
  // but all are very desaturated so text stays readable
  cardDefault: "#FFFFFF",
  cardFamily: "#F0EDFF", // Soft purple  — matches brand
  cardHealth: "#E8F5F0", // Soft mint-green
  cardLearning: "#FFF4EC", // Soft warm amber
  cardSelfCare: "#EFF6FF", // Soft sky-blue

  cardTitle: "#1A1635",
  cardTime: "#5A5870",
  cardDuration: "#8A8A9A",

  // Badges — deeper tints of each card color so they stand out on the card bg
  badgeFamilyBg: "#DDD6FE",
  badgeFamilyText: "#4C1D95",
  badgeHealthBg: "#A7F3D0",
  badgeHealthText: "#065F46",
  badgeLearningBg: "#FED7AA",
  badgeLearningText: "#92400E",
  badgeSelfCareBg: "#BFDBFE",
  badgeSelfCareText: "#1E40AF",

  checkboxBorder: "#D1D1DF",
  checkboxCheckedBg: "#1A1635",
  checkboxTick: "#FFFFFF",

  tabBarBg: "#FFFFFF",
  tabIconActive: "#6C47FF",
  tabIconInactive: "#C4C2D4",

  text: "#1A1635",
  textMuted: "#8A8A9A",

  border: "#EDEAF8",
};

// ─────────────────────────────────────────────────────────────────────────────
//  DARK THEME
//  Base: deep navy (#12111F) — not pure black, avoids harshness
//  Accent: slightly lighter purple (#7C5CFF) — pops on dark bg
//  Cards: dark tints, each category recognisable but subtle
// ─────────────────────────────────────────────────────────────────────────────
export const darkTheme: Theme = {
  background: "#12111F",

  surface: "#1E1C30",
  surfaceRaised: "#1E1C30",

  accent: "#7C5CFF", // Lighter than light-theme accent — same hue, more visible
  accentLight: "#2A2448", // Dark purple tint for inactive date pills
  accentText: "#FFFFFF",

  fabBg: "#FF5A5F", // Same FAB — brand consistency
  fabIcon: "#FFFFFF",

  headerTitle: "#F0EFFA",
  headerSubtitle: "#6B6A80",

  dateInactiveBg: "#2A2448",
  dateActiveBg: "#7C5CFF",
  dateInactiveText: "#6B6A80",
  dateActiveText: "#FFFFFF",

  cardDefault: "#1E1C30",
  cardFamily: "#221E3A", // Dark purple
  cardHealth: "#172A24", // Dark green
  cardLearning: "#2A1F12", // Dark amber
  cardSelfCare: "#162030", // Dark blue

  cardTitle: "#F0EFFA",
  cardTime: "#9896AC",
  cardDuration: "#6B6A80",

  badgeFamilyBg: "#3D3560",
  badgeFamilyText: "#C4B5FD",
  badgeHealthBg: "#134E38",
  badgeHealthText: "#6EE7B7",
  badgeLearningBg: "#3D2A0A",
  badgeLearningText: "#FCD34D",
  badgeSelfCareBg: "#0C2240",
  badgeSelfCareText: "#93C5FD",

  checkboxBorder: "#3A384E",
  checkboxCheckedBg: "#7C5CFF",
  checkboxTick: "#FFFFFF",

  tabBarBg: "#1E1C30",
  tabIconActive: "#7C5CFF",
  tabIconInactive: "#3D3C52",

  text: "#F0EFFA",
  textMuted: "#6B6A80",

  border: "#2A2840",
};

// ─────────────────────────────────────────────────────────────────────────────
//  CUSTOM THEME TEMPLATE
//  Duplicate this and fill in your values to add a new theme.
//  Then register it in ThemeContext (see below).
// ─────────────────────────────────────────────────────────────────────────────
// export const roseTheme: Theme = {
//   background:        "#FFF5F5",
//   surface:           "#FFFFFF",
//   surfaceRaised:     "#FFFFFF",
//   accent:            "#E11D48",
//   accentLight:       "#FFE4E6",
//   accentText:        "#FFFFFF",
//   fabBg:             "#E11D48",
//   fabIcon:           "#FFFFFF",
//   headerTitle:       "#1A0A0E",
//   headerSubtitle:    "#9A7A80",
//   dateInactiveBg:    "#FFE4E6",
//   dateActiveBg:      "#E11D48",
//   dateInactiveText:  "#9A7A80",
//   dateActiveText:    "#FFFFFF",
//   cardDefault:       "#FFFFFF",
//   cardFamily:        "#FFF1F2",
//   cardHealth:        "#F0FDF4",
//   cardLearning:      "#FFFBEB",
//   cardSelfCare:      "#EFF6FF",
//   cardTitle:         "#1A0A0E",
//   cardTime:          "#6B4050",
//   cardDuration:      "#9A7A80",
//   badgeFamilyBg:     "#FECDD3",  badgeFamilyText:   "#9F1239",
//   badgeHealthBg:     "#BBF7D0",  badgeHealthText:   "#14532D",
//   badgeLearningBg:   "#FDE68A",  badgeLearningText: "#78350F",
//   badgeSelfCareBg:   "#BFDBFE",  badgeSelfCareText: "#1E3A8A",
//   checkboxBorder:    "#FECDD3",
//   checkboxCheckedBg: "#E11D48",
//   checkboxTick:      "#FFFFFF",
//   tabBarBg:          "#FFFFFF",
//   tabIconActive:     "#E11D48",
//   tabIconInactive:   "#F0B8C0",
//   text:              "#1A0A0E",
//   textMuted:         "#9A7A80",
//   border:            "#FFE4E6",
// };

// ─────────────────────────────────────────────────────────────────────────────
//  ALL THEMES REGISTRY
//  Add new themes here — ThemeContext will pick them up automatically.
// ─────────────────────────────────────────────────────────────────────────────
export type ThemeName = "light" | "dark"; // extend: | "rose" | "forest"

export const themes: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  // rose: roseTheme,  ← uncomment when ready
};
