import TabBar from "@/components/TabBar";
import { hiddenScreens } from "@/constants/constants";
import { ThemeProvider } from "@/constants/ThemeContext";
import { useFonts } from "expo-font";
import { Slot, useSegments } from "expo-router";
import { View } from "react-native";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pompiere: require("../assets/fonts/Pompiere-Regular.ttf"),
    Inter: require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  const segments = useSegments();

  // current screen ka naam (last segment)
  const currentScreen = segments[segments.length - 1];

  const hideTabBar = hiddenScreens.includes(currentScreen);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <View className="flex-1 bg-[#F5F0FF]">
        <Slot />
        {!hideTabBar && <TabBar />}
      </View>
    </ThemeProvider>
  );
}
