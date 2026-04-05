import CustomTabBar from "@/components/TabBar";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pompiere: require("../assets/fonts/Pompiere-Regular.ttf"),
    Inter: require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
        initialRouteName="index"
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="AddTask" />
        <Tabs.Screen name="Pomodoro" />
        <Tabs.Screen name="task/[id]" />
      </Tabs>
    </>
  );
}
