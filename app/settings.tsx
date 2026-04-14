import { useTheme } from "@/constants/ThemeContext";
import { useColorScheme } from "nativewind";
import { Button, Text, View } from "react-native";

export default function Settings() {
  //@ts-ignore
  const { setTheme } = useTheme();
  const { setColorScheme } = useColorScheme(); // 🔥 important (NativeWind)

  const handleThemeChange = (mode: "light" | "dark" | "system") => {
    if (mode === "system") {
      setTheme("system");
      setColorScheme("light"); // fallback (ya tu system detect kar sakta hai)
      console.log("System theme selected");
      return;
    }

    setTheme(mode);
    setColorScheme(mode);
    console.log(`${mode} theme selected`);
  };

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-2xl font-bold">Choose Theme</Text>

      <Button title="Light" onPress={() => handleThemeChange("light")} />

      <Button title="Dark" onPress={() => handleThemeChange("dark")} />

      <Button
        title="System Default"
        onPress={() => handleThemeChange("system")}
      />
    </View>
  );
}
