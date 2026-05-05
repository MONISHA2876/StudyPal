import { useTheme } from "@/constants/ThemeContext";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Schedule() {
  //@ts-ignore
  const { theme } = useTheme();
  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: theme.background }}
      edges={["left", "right"]}
    >
      <Text className="text-2xl font-bold">Schedule Page</Text>
    </SafeAreaView>
  );
}
