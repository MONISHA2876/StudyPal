import { useTheme } from "@/constants/ThemeContext";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notes() {
  //@ts-ignore
  const { theme } = useTheme();
  const notes: any[] = [];
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background, padding: 20 }}
      edges={["top", "left", "right"]}
    >
      <Text className="text-4xl font-inter">Notes</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 60,
        }}
      >
        {notes.length === 0 ? (
          <View
            className="flex-1 justify-center items-center"
            style={{ marginVertical: "auto" }}
          >
            <Image
              source={require("@/assets/images/panda-light.png")}
              style={{ height: 300, width: 300 }}
            />
            <Text className="mt-4 text-gray-500 text-2xl">
              There is no note available !
            </Text>
            <Text className="mt-4 text-gray-500 text-2xl">
              Click + to add new note !
            </Text>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
