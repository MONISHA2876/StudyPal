import { colors } from "@/constants/constants";
import { useTheme } from "@/constants/ThemeContext";
import { getValueFor } from "@/database/SecureStoreFunctions";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notes() {
  //@ts-ignore
  const { theme } = useTheme();

  const [notes, setNotes] = useState([] as any);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await getValueFor("Notes");
        const parsedData = data ? JSON.parse(data) : [];
        // ensure always array
        setNotes(Array.isArray(parsedData) ? parsedData : []);
      } catch (e) {
        console.log("Error parsing notes:", e);
        setNotes([]);
      }
    };

    getNotes();
  }, []);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background, padding: 20 }}
      edges={["top", "left", "right"]}
    >
      {/* Title */}
      <Text className="text-4xl font-inter" style={{ color: theme.text }}>
        Notes
      </Text>

      {/* Content */}
      {notes.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("@/assets/images/panda-light.png")}
            style={{ height: 300, width: 300 }}
          />

          <Text className="mt-4 text-2xl" style={{ color: theme.text }}>
            There is no note available!
          </Text>

          <Text className="mt-2 text-lg" style={{ color: theme.text }}>
            Click + to add new note
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : index.toString()
          }
          contentContainerStyle={{ paddingBottom: 100, marginTop: 20 }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => {
            if (!item) return null;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const colorFromTheme =
              theme[color as keyof typeof theme] || "#F5E6CC";

            return (
              //@ts-ignore
              <Link href={`./noteDetails/${item.id}`} asChild>
                <Pressable
                  style={{
                    marginVertical: 20,
                    marginHorizontal: 10,
                    padding: 15,
                    borderRadius: 12,
                    backgroundColor: colorFromTheme,
                    width: "45%",
                  }}
                >
                  {item?.title && (
                    <Text
                      style={{
                        color: theme.text,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {item?.title || "No Title"}
                    </Text>
                  )}

                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 16,
                      marginVertical: 15,
                    }}
                  >
                    {item?.content || "No Content"}
                  </Text>
                  {item?.createdAt && (
                    <>
                      <Text
                        style={{
                          color: theme.textMuted,
                          fontSize: 12,
                          alignSelf: "flex-end",
                          marginTop: 5,
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
                        {new Date(item?.createdAt).toLocaleDateString() ||
                          "No Date"}
                      </Text>
                    </>
                  )}
                </Pressable>
              </Link>
            );
          }}
        />
      )}

      {/* Floating Button */}
      <Pressable
        className="absolute items-center justify-center"
        style={{
          backgroundColor: theme.surface,
          bottom: 20,
          alignSelf: "center",
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderRadius: 100,
        }}
        onPress={() => router.push("/notes/addNote")}
      >
        <Text style={{ color: theme.text, fontSize: 16, fontWeight: "bold" }}>
          + CREATE NOTE
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
