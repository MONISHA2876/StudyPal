export type Theme = {
  background: string;
  surface: string;
  surfaceRaised: string;
  accent: string;
  accentLight: string;
  accentText: string;
  fabBg: string;
  fabIcon: string;
  headerTitle: string;
  headerSubtitle: string;
  dateInactiveBg: string;
  dateActiveBg: string;
  dateInactiveText: string;
  dateActiveText: string;
  cardDefault: string;
  cardFamily: string;
  cardHealth: string;
  cardLearning: string;
  cardSelfCare: string;
  cardTitle: string;
  cardTime: string;
  cardDuration: string;
  badgeFamilyBg: string;
  badgeFamilyText: string;
  badgeHealthBg: string;
  badgeHealthText: string;
  badgeLearningBg: string;
  badgeLearningText: string;
  badgeSelfCareBg: string;
  badgeSelfCareText: string;
  checkboxBorder: string;
  checkboxCheckedBg: string;
  checkboxTick: string;
  tabBarBg: string;
  tabIconActive: string;
  tabIconInactive: string;
  text: string;
  textMuted: string;
  border: string;
  Sand: string;
  Sage: string;
  Blush: string;
  Lavender: string;
  Mist: string;
  Slate: string;
};

export const themes: Record<string, Theme> = {
  // ─────────────────────────────────────────────
  // LIGHT  —  pink-lavender tint, warm & bright
  // ─────────────────────────────────────────────
  light: {
    background: "#F2E4F0", // soft pink-lavender page bg
    surface: "#FFFFFF",
    surfaceRaised: "#FFFFFF",
    accent: "#6C47FF",
    accentLight: "#EAE4FF",
    accentText: "#FFFFFF",
    fabBg: "#FF5A5F",
    fabIcon: "#FFFFFF",
    headerTitle: "#1A1635",
    headerSubtitle: "#8A8A9A",
    dateInactiveBg: "#EAD8F0",
    dateActiveBg: "#6C47FF",
    dateInactiveText: "#7A7A90",
    dateActiveText: "#FFFFFF",
    cardDefault: "#FFFFFF",
    cardFamily: "#EDE8FF", // soft violet
    cardHealth: "#DFF4EC", // fresh mint
    cardLearning: "#FFF0E4", // warm peach
    cardSelfCare: "#E8F3FF", // sky blue
    cardTitle: "#1A1635",
    cardTime: "#5A5870",
    cardDuration: "#8A8A9A",
    badgeFamilyBg: "#D8D0FE",
    badgeFamilyText: "#3B1A8A",
    badgeHealthBg: "#9FECCC",
    badgeHealthText: "#065F46",
    badgeLearningBg: "#FECFA0",
    badgeLearningText: "#7A3200",
    badgeSelfCareBg: "#B8D9FE",
    badgeSelfCareText: "#1A3A8A",
    checkboxBorder: "#C8C5DC",
    checkboxCheckedBg: "#1A1635",
    checkboxTick: "#FFFFFF",
    tabBarBg: "#FFFFFF",
    tabIconActive: "#6C47FF",
    tabIconInactive: "#C0BDD4",
    text: "#1A1635",
    textMuted: "#8A8A9A",
    border: "#EAD8EE",
    // bright, punchy category colors on the pink-lavender bg
    Sand: "#FCE8BD",
    Sage: "#CAF2B6",
    Blush: "#FFD7D1",
    Lavender: "#F0D4FF",
    Mist: "#B8FFF3",
    Slate: "#C2EAFF",
  },

  // ─────────────────────────────────────────────
  // DARK  —  lifted from pitch-black, feels rich
  // ─────────────────────────────────────────────
  dark: {
    background: "#1C1A2E", // deep indigo, not black
    surface: "#26233C", // lifted surface
    surfaceRaised: "#2E2B46", // card sits above surface
    accent: "#8B6FFF",
    accentLight: "#312B52",
    accentText: "#FFFFFF",
    fabBg: "#FF5A5F",
    fabIcon: "#FFFFFF",
    headerTitle: "#F0EFFA",
    headerSubtitle: "#7A7990",
    dateInactiveBg: "#312B52",
    dateActiveBg: "#8B6FFF",
    dateInactiveText: "#7A7990",
    dateActiveText: "#FFFFFF",
    cardDefault: "#2E2B46",
    cardFamily: "#2C2848", // violet tint
    cardHealth: "#1E3030", // teal tint
    cardLearning: "#332412", // amber tint
    cardSelfCare: "#1C2840", // blue tint
    cardTitle: "#F0EFFA",
    cardTime: "#A09EBA",
    cardDuration: "#7A7990",
    badgeFamilyBg: "#42387A",
    badgeFamilyText: "#C9B8FF",
    badgeHealthBg: "#1A5540",
    badgeHealthText: "#72EDB8",
    badgeLearningBg: "#4A3210",
    badgeLearningText: "#FFCC66",
    badgeSelfCareBg: "#142848",
    badgeSelfCareText: "#90C8FF",
    checkboxBorder: "#42405A",
    checkboxCheckedBg: "#8B6FFF",
    checkboxTick: "#FFFFFF",
    tabBarBg: "#26233C",
    tabIconActive: "#8B6FFF",
    tabIconInactive: "#46445E",
    text: "#F0EFFA",
    textMuted: "#7A7990",
    border: "#32304A",
    Sand: "#5A4520",
    Sage: "#2C4A18",
    Blush: "#502020",
    Lavender: "#3A2248",
    Mist: "#1C3E34",
    Slate: "#1C3450",
  },

  // ─────────────────────────────────────────────
  // FOREST  —  green-led, earthy, natural
  // ─────────────────────────────────────────────
  forest: {
    background: "#E8F0E4", // pale sage page bg
    surface: "#FFFFFF",
    surfaceRaised: "#FFFFFF",
    accent: "#2E7D52", // rich forest green
    accentLight: "#DCEEDD",
    accentText: "#FFFFFF",
    fabBg: "#E07B39", // terracotta pop
    fabIcon: "#FFFFFF",
    headerTitle: "#1A2A1E",
    headerSubtitle: "#6A826C",
    dateInactiveBg: "#DCEEDD",
    dateActiveBg: "#2E7D52",
    dateInactiveText: "#6A826C",
    dateActiveText: "#FFFFFF",
    cardDefault: "#FFFFFF",
    cardFamily: "#F0EBE0", // warm linen
    cardHealth: "#DDEEDD", // light green
    cardLearning: "#FFF4E0", // honey
    cardSelfCare: "#E4EEF8", // soft sky
    cardTitle: "#1A2A1E",
    cardTime: "#4A6050",
    cardDuration: "#6A826C",
    badgeFamilyBg: "#E0D5C0",
    badgeFamilyText: "#5A3A10",
    badgeHealthBg: "#AADCC0",
    badgeHealthText: "#1A5030",
    badgeLearningBg: "#FFD8A0",
    badgeLearningText: "#6A3A00",
    badgeSelfCareBg: "#B8D8F0",
    badgeSelfCareText: "#1A3A6A",
    checkboxBorder: "#AABCAA",
    checkboxCheckedBg: "#2E7D52",
    checkboxTick: "#FFFFFF",
    tabBarBg: "#FFFFFF",
    tabIconActive: "#2E7D52",
    tabIconInactive: "#AABCAA",
    text: "#1A2A1E",
    textMuted: "#6A826C",
    border: "#D4E4D4",
    Sand: "#B8D468", // yellow-green
    Sage: "#52C44A", // vivid grass green
    Blush: "#A8D870", // lime-green
    Lavender: "#68C098", // green-teal
    Mist: "#40B890", // medium teal-green
    Slate: "#58A870", // forest green-blue
  },

  // ─────────────────────────────────────────────
  // ROSE  —  warm blush, romantic, editorial
  // ─────────────────────────────────────────────
  rose: {
    background: "#F5E8EC", // blush page bg
    surface: "#FFFFFF",
    surfaceRaised: "#FFFFFF",
    accent: "#C2426A", // deep rose
    accentLight: "#F8DCEA",
    accentText: "#FFFFFF",
    fabBg: "#7C5CFF", // violet contrast FAB
    fabIcon: "#FFFFFF",
    headerTitle: "#2A1018",
    headerSubtitle: "#9A7080",
    dateInactiveBg: "#F8DCEA",
    dateActiveBg: "#C2426A",
    dateInactiveText: "#9A7080",
    dateActiveText: "#FFFFFF",
    cardDefault: "#FFFFFF",
    cardFamily: "#FDEEF4", // blush pink
    cardHealth: "#E8F5EE", // sage green
    cardLearning: "#FFF4E8", // warm peach
    cardSelfCare: "#EEE8FC", // soft lilac
    cardTitle: "#2A1018",
    cardTime: "#6A4858",
    cardDuration: "#9A7080",
    badgeFamilyBg: "#F4C8D8",
    badgeFamilyText: "#7A1035",
    badgeHealthBg: "#A8E0C0",
    badgeHealthText: "#0A4828",
    badgeLearningBg: "#FFCFA0",
    badgeLearningText: "#6A3000",
    badgeSelfCareBg: "#D0C0F8",
    badgeSelfCareText: "#3A1888",
    checkboxBorder: "#E0C0CC",
    checkboxCheckedBg: "#C2426A",
    checkboxTick: "#FFFFFF",
    tabBarBg: "#FFFFFF",
    tabIconActive: "#C2426A",
    tabIconInactive: "#DDB8C4",
    text: "#2A1018",
    textMuted: "#9A7080",
    border: "#EDD8E0",
    Sand: "#E8905A", // burnt orange-red
    Sage: "#D85A6A", // warm crimson
    Blush: "#E83848", // vivid red
    Lavender: "#C84870", // rose-red
    Mist: "#D06858", // terracotta red
    Slate: "#B84858", // deep rose-red
  },

  // ─────────────────────────────────────────────
  // DUSK  —  warm slate, sophisticated & moody
  // ─────────────────────────────────────────────
  dusk: {
    background: "#2A2438", // deep warm violet
    surface: "#342E48",
    surfaceRaised: "#3E3858",
    accent: "#F0A050", // amber gold
    accentLight: "#4A3820",
    accentText: "#1A1010",
    fabBg: "#F06070",
    fabIcon: "#FFFFFF",
    headerTitle: "#F5F0E8",
    headerSubtitle: "#887890",
    dateInactiveBg: "#4A3820",
    dateActiveBg: "#F0A050",
    dateInactiveText: "#887890",
    dateActiveText: "#1A1010",
    cardDefault: "#3E3858",
    cardFamily: "#3A3455", // deep violet
    cardHealth: "#243838", // dark teal
    cardLearning: "#3A2A18", // dark amber
    cardSelfCare: "#2A2A48", // dark blue
    cardTitle: "#F5F0E8",
    cardTime: "#A898B0",
    cardDuration: "#887890",
    badgeFamilyBg: "#504870",
    badgeFamilyText: "#D0C0FF",
    badgeHealthBg: "#224840",
    badgeHealthText: "#70DDB8",
    badgeLearningBg: "#503820",
    badgeLearningText: "#FFCC70",
    badgeSelfCareBg: "#202848",
    badgeSelfCareText: "#88C0FF",
    checkboxBorder: "#504868",
    checkboxCheckedBg: "#F0A050",
    checkboxTick: "#1A1010",
    tabBarBg: "#342E48",
    tabIconActive: "#F0A050",
    tabIconInactive: "#504868",
    text: "#F5F0E8",
    textMuted: "#887890",
    border: "#3E3858",
    Sand: "#6A5030",
    Sage: "#344A20",
    Blush: "#582828",
    Lavender: "#443060",
    Mist: "#224040",
    Slate: "#223858",
  },
};

export type ThemeName = keyof typeof themes;
