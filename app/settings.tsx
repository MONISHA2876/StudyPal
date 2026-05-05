import { useTheme } from "@/constants/ThemeContext";
import { useColorScheme } from "nativewind";
import { Button, Text, View } from "react-native";

export default function Settings() {
  //@ts-ignore
  const { theme, setTheme } = useTheme();
  const { setColorScheme } = useColorScheme();

  const handleThemeChange = (mode: any) => {
    if (mode === "system") {
      setTheme("system");
      setColorScheme("light");

      return;
    }

    setTheme(mode);
    setColorScheme(mode);
    console.log(`${mode} theme selected`);
  };

  return (
    <View
      className="flex-1 items-center justify-center gap-4"
      style={{ backgroundColor: theme.background }}
    >
      <Text className="text-2xl font-bold" style={{ color: theme.text }}>
        Choose Theme
      </Text>

      <Button title="Light" onPress={() => handleThemeChange("light")} />

      <Button title="Dark" onPress={() => handleThemeChange("dark")} />

      <Button title="Forest" onPress={() => handleThemeChange("forest")} />

      <Button title="Rose" onPress={() => handleThemeChange("rose")} />

      <Button title="Dusky" onPress={() => handleThemeChange("dusk")} />

      <Button
        title="System Default"
        onPress={() => handleThemeChange("system")}
      />
    </View>
  );
}
