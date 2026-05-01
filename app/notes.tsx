import { useTheme } from "@/constants/ThemeContext";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notes() {
  //@ts-ignore
  const { theme } = useTheme();
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background, padding: 20 }}
      edges={["top", "left", "right"]}
    >
      <Text className="text-2xl font-inter">Notes</Text>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
}
