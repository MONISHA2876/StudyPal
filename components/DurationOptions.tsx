import { DurationOption } from "@/types/types";
import { FlatList, Text, View } from "react-native";

/* --------------------------- DURATION OPTIONS --------------------------- */
const durationOptions: DurationOption[] = [
  { label: "5min", value: 5 },
  { label: "10min", value: 10 },
  { label: "15min", value: 15 },
  { label: "20min", value: 20 },
  { label: "25min", value: 25 },
  { label: "30min", value: 30 },
  { label: "45min", value: 45 },
  { label: "1hr", value: 60 },
  { label: "1.5hrs", value: 90 },
  { label: "2hrs", value: 120 },
  { label: "2.5hrs", value: 150 },
  { label: "3hrs", value: 180 },
  { label: "3.5hrs", value: 210 },
  { label: "4hrs", value: 240 },
  { label: "4.5hrs", value: 270 },
  { label: "5hrs", value: 300 },
  { label: "5.5hrs", value: 330 },
  { label: "6hrs", value: 360 },
  { label: "6.5hrs", value: 390 },
  { label: "7hrs", value: 420 },
  { label: "7.5hrs", value: 450 },
  { label: "8hrs", value: 480 },
];

export default function DurationOptions() {
  return (
    <View>
      <FlatList
        data={durationOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.value.toString()}
        contentContainerStyle={{ paddingHorizontal: 1 }}
        renderItem={({ item }) => (
          <View className="w-[50px] h-[50px] bg-white rounded-lg mx-2 items-center justify-center">
            <Text className="text-center font-medium">{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
}
