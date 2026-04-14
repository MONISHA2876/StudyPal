import { useTheme } from "@/constants/ThemeContext";
import { DurationOption } from "@/constants/types";
import { FlatList, Pressable, Text, View } from "react-native";

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

interface DurationOptionsProps {
  selectDuration: (duration: DurationOption) => void;
  selectedDuration: number;
}

export default function DurationOptions({
  selectDuration,
  selectedDuration,
}: DurationOptionsProps) {
  //@ts-ignore
  const { theme } = useTheme();

  return (
    <View>
      <FlatList
        data={durationOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.value.toString()}
        contentContainerStyle={{ paddingHorizontal: 1 }}
        renderItem={({ item }) => {
          const isSelected = item.value === selectedDuration;

          return (
            <Pressable
              onPress={() => selectDuration(item)}
              className="w-[50px] h-[50px] rounded-lg mx-2 items-center justify-center"
              style={{
                backgroundColor: isSelected ? theme.accent : theme.surface,
              }}
            >
              <Text
                className="text-center font-medium"
                style={{
                  color: isSelected ? theme.accentText : theme.text,
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
