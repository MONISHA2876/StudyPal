import { useTheme } from "@/constants/ThemeContext";
import { deleteNote, getNote } from "@/database/SecureStoreFunctions";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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

export default function NoteDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  //@ts-ignore
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdOn, setCreatedOn] = useState<number | null>(null);

  //Get the note details using the id from params
  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        const note = await getNote(Number(id));
        if (note) {
          setTitle(note.title);
          setContent(note.content);
          setCreatedOn(note.createdAt);
        }
      }
    };

    fetchNote();
  }, [id]);

  const handleDeleteNote = async () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note :(", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteNote(Number(id));
          router.back();
        },
      },
    ]);
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
                onPress={() => router.back()}
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
                EDIT
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
              <Pressable onPress={handleDeleteNote}>
                <Text style={{ fontSize: 25, margin: 5 }}>🗑️</Text>
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

          <Text
            style={{
              color: theme.textMuted,
              fontSize: 12,
              alignSelf: "flex-end",
              marginTop: 50,
            }}
          >
            Created On
          </Text>
          <Text
            style={{
              color: theme.textMuted,
              fontSize: 12,
              alignSelf: "flex-end",
            }}
          >
            {
              //@ts-ignore
              new Date(createdOn).toLocaleDateString() || "No Date"
            }
          </Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
