import { useTheme } from "@/constants/ThemeContext";
import { CalendarDate } from "@/constants/types";
import { useMemo, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";

const generateDatesAroundToday = (range = 14): CalendarDate[] => {
  const dates: CalendarDate[] = [];
  const today = new Date();

  for (let i = -range; i <= range; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    dates.push({
      id: d.toISOString(),
      day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      date: d.getDate(),
      isToday: i === 0,
      fullDate: d,
    });
  }
  return dates;
};

const ITEM_WIDTH = 43;
const ITEM_MARGIN = 8;
const ITEM_TOTAL = ITEM_WIDTH + ITEM_MARGIN * 2;

export default function HorizontalCalendar({
  onDateChange,
}: {
  onDateChange: (date: Date) => void;
}) {
  //@ts-ignore
  const { theme } = useTheme();
  const dates = useMemo(() => generateDatesAroundToday(14), []);
  const todayIndex = dates.findIndex((d) => d.isToday);
  const [selected, setSelected] = useState<CalendarDate>(dates[todayIndex]);

  const screenWidth = Dimensions.get("window").width;

  const initialOffset = Math.max(
    0,
    todayIndex * ITEM_TOTAL - screenWidth / 2 + ITEM_TOTAL / 2 + 50,
  );

  const onSelect = (item: CalendarDate) => {
    setSelected(item);
    onDateChange(item.fullDate);
  };

  return (
    <View className="py-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        contentOffset={{ x: initialOffset, y: 0 }} // ✅ No ref, no effect, no timeout
      >
        {dates.map((item) => {
          const active = item.id === selected.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onSelect(item)}
              className="w-[43px] h-[51px] rounded-lg font-inter flex items-center justify-center m-2 p-0"
              style={{
                boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.3)",
                backgroundColor: active
                  ? theme.dateActiveBg
                  : theme.dateInactiveBg,
                transform: active ? [{ scale: 1.1 }] : [{ scale: 1 }],
              }}
            >
              <Text
                className="text-xs font-semibold"
                style={{
                  color: active ? theme.dateActiveText : theme.dateInactiveText,
                }}
              >
                {item.day}
              </Text>
              <Text
                className="text-lg font-semibold"
                style={{
                  color: active ? theme.dateActiveText : theme.dateInactiveText,
                }}
              >
                {item.date}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
