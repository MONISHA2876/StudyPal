import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

/* --------------------------- TYPES --------------------------- */
type CalendarDate = {
  id: string;
  day: string;
  date: number;
  isToday: boolean;
  fullDate: Date;
};

/* --------------------------- DATE GENERATOR --------------------------- */
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

const dates = generateDatesAroundToday(14);

/* --------------------------- COMPONENT --------------------------- */
export default function HorizontalCalendar({
  onDateChange,
}: {
  onDateChange: (date: Date) => void;
}) {
  const listRef = useRef<FlatList<CalendarDate> | null>(null);

  const todayIndex = dates.findIndex((d) => d.isToday);
  const [selected, setSelected] = useState<CalendarDate>(dates[todayIndex]);

  /* --------------------------- Auto scroll to today --------------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToIndex({
          index: todayIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [todayIndex]);

  const onSelect = (item: CalendarDate) => {
    setSelected(item);
    onDateChange(item.fullDate);
  };

  return (
    <View className="py-4">
      <FlatList
        ref={listRef}
        data={dates}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: 64,
          offset: 64 * index,
          index,
        })}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            listRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }, 100);
        }}
        renderItem={({ item }) => {
          const active = item.id === selected.id;

          return (
            <Pressable
              onPress={() => onSelect(item)}
              className={`w-[43px] h-[51px] rounded-lg font-inter flex items-center justify-center m-2 p-0`}
              style={{
                boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.3)",
                backgroundColor: active ? "#E8D1F3" : "#A889B7",
                transform: active ? [{ scale: 1.1 }] : [{ scale: 1 }],
              }}
            >
              <Text
                className={`text-xs  font-semibold ${active ? "text-[#7F4CA6]" : "text-white"}`}
              >
                {item.day}
              </Text>
              <Text
                className={`text-lg  font-semibold ${active ? "text-[#7F4CA6]" : "text-white"}`}
              >
                {item.date}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
