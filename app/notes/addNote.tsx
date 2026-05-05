import { useTheme } from "@/constants/ThemeContext";
import { saveNote } from "@/database/SecureStoreFunctions";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Share,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AddNote() {
  //@ts-ignore
  const { theme } = useTheme();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!content.trim()) {
      alert("Add some content to save the note :)");
      return;
    }
    saveNote({
      id: Date.now(),
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
    });
    router.back();
  };

  const handleShareNote = async () => {
    try {
      await Share.share({
        message: `Title: ${title}\n\nContent: ${content}`,
      });
    } catch (e) {
      console.log("Error sharing note:", e);
      Alert.alert("Error", "An error occurred while trying to share the note.");
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: theme.background, flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingTop: 30 }}>
        <View style={{ padding: 20 }}>
          <View className="flex flex-row justify-between">
            <Pressable onPress={() => router.back()}>
              <Image
                source={require("@/assets/images/Icons/Cross.png")}
                style={{ width: 30, height: 30, tintColor: theme.text }}
              />
            </Pressable>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Text
                onPress={handleSave}
                className="font-bold font-inter"
                style={{
                  fontSize: 18,
                  color: theme.text,
                  backgroundColor: theme.surface,
                  paddingHorizontal: 15,
                  paddingVertical: 3,
                  borderRadius: 100,
                }}
              >
                SAVE
              </Text>
              <Pressable onPress={() => router.back()}>
                <Image
                  source={require("@/assets/images/Icons/Star.png")}
                  style={{ width: 30, height: 30, tintColor: theme.text }}
                />
              </Pressable>
              <Pressable onPress={handleShareNote}>
                <Image
                  source={require("@/assets/images/Icons/Share.png")}
                  style={{ width: 30, height: 30, tintColor: theme.text }}
                />
              </Pressable>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <TextInput
              placeholder="Notes Title"
              placeholderTextColor={theme.textMuted}
              value={title}
              onChangeText={setTitle}
              className="font-bold font-inter"
              style={{ fontSize: 24, color: theme.text }}
            />
            <TextInput
              placeholder="Write your note here..."
              placeholderTextColor={theme.textMuted}
              value={content}
              onChangeText={setContent}
              className="font-normal font-inter mt-4"
              style={{ fontSize: 16, color: theme.text }}
              multiline
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
