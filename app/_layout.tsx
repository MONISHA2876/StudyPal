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
      <Tabs initialRouteName="index">
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="AddTask"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' }

          }}
        />
        <Tabs.Screen
          name="Pomodoro"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' }
          }}
        />
      </Tabs>
    </>
  );
}
