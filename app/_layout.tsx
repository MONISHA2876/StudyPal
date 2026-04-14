import TabBar from "@/components/TabBar";
import { ThemeProvider } from "@/constants/ThemeContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { View } from "react-native";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pompiere: require("../assets/fonts/Pompiere-Regular.ttf"),
    Inter: require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <>
      <ThemeProvider>
        <View className="flex-1 bg-[#F5F0FF]">
          <Slot />
          <TabBar />
        </View>
      </ThemeProvider>
    </>
  );
}
