import TabBar from "@/components/TabBar";
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
      <View className="flex-1 bg-[#F5F0FF]">
        {/* Active screen content */}
        <Slot />

        {/* Floating custom tab bar */}
        <TabBar />
      </View>
    </>
  );
}
