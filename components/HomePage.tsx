import { useTheme } from "@/constants/ThemeContext";
import { Task } from "@/constants/types";
import { getValueFor, save } from "@/database/SecureStoreFunctions";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalCalendar from "./HorizontalCalender";

export default function HomePage() {
  //@ts-ignore
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useFocusEffect(
    useCallback(() => {
      const reloadTasks = async () => {
        const stored = await getValueFor("Tasks");
        if (stored) {
          setAllTasks(JSON.parse(stored));
        }
      };

      reloadTasks();
    }, []),
  );

  useEffect(() => {
    const filtered = allTasks.filter((task) => {
      const taskDate = new Date(task.createdAt);
      const selectedDateString = selectedDate.toDateString();
      const taskDateString = taskDate.toDateString();
      return taskDateString === selectedDateString;
    });
    setFilteredTasks(filtered);
  }, [allTasks, selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleIsComplete = (id: number) => {
    const updated = allTasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
    );
    setAllTasks(updated);
    save("Tasks", JSON.stringify(updated));
  };

  return (
    <SafeAreaView
      className="w-screen min-h-screen flex flex-col items-center justify-start"
      style={{ padding: 0, margin: 0, backgroundColor: theme.background }}
      edges={["left", "right"]}
    >
      <View
        id="header"
        className="w-screen flex items-center justify-center"
        style={{ margin: 0, paddingTop: 40, backgroundColor: theme.background }}
      >
        <Text
          className="font-pompiere text-4xl font-thin w-full text-center p-2 px-4"
          style={{ color: theme.headerTitle }}
        >
          Today
        </Text>
        <Link href="/settings" asChild>
          <Text className="absolute right-4 top-12 text-2xl">⚙️</Text>
        </Link>
        <View id="calendar" className="w-full">
          <HorizontalCalendar onDateChange={handleDateChange} />
        </View>
      </View>

      <View
        id="tasksList"
        className="items-center justify-start p-6"
        style={{ flex: 1, width: "100%", backgroundColor: theme.surface }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <View
            className="w-full items-center justify-start gap-6"
            style={{ flex: 1, paddingBottom: 100 }}
          >
            {filteredTasks.length === 0 ? (
              <View className="w-full p-8 flex items-center justify-center">
                <Text
                  className="font-inter text-lg text-center"
                  style={{ color: theme.textMuted }}
                >
                  🌿 No tasks for this day
                </Text>
                <Text
                  className="font-inter text-sm text-center mt-2"
                  style={{ color: theme.textMuted }}
                >
                  Add a task to get started!
                </Text>
              </View>
            ) : (
              filteredTasks.map((task) => {
                const colorOfTask: string = task.color || "#F5E6CC";
                const colorFromTheme =
                  theme[colorOfTask as keyof typeof theme] || colorOfTask;
                return (
                  <View
                    key={task.id}
                    className="w-full rounded-lg p-4 flex flex-row justify-between"
                    style={{ backgroundColor: colorFromTheme }}
                  >
                    <Link
                      href={{
                        pathname: "/task/[id]",
                        params: {
                          id: task.id,
                          timeslot: task.timeSlot,
                          emoji: task.emoji,
                          title: task.title,
                          duration: task.duration,
                          categories: task.Categories,
                          color: task.color,
                        },
                      }}
                      asChild
                    >
                      <Pressable className="flex justify-start items-start gap-4 flex-1">
                        <Text
                          className="font-normal font-md font-inter opacity-[51%]"
                          style={{ color: theme.cardTime }}
                        >
                          {task.timeSlot || "Any Time"}
                        </Text>
                        <Text
                          className="font-bold font-inter font-xl"
                          style={{ color: theme.cardTitle }}
                        >
                          {task.emoji} {task.title}
                        </Text>
                        <Text
                          className="font-normal font-md font-inter opacity-[51%]"
                          style={{ color: theme.cardDuration }}
                        >
                          {task.duration
                            ? `${task.duration} minutes`
                            : "All day"}
                        </Text>
                      </Pressable>
                    </Link>
                    <View className="flex justify-start items-end">
                      <Text
                        className="font-normal font-md font-inter opacity-[51%]"
                        style={{ color: theme.cardTime }}
                      >
                        {task.Categories ? task.Categories.join(", ") : " "}
                      </Text>
                      <Pressable
                        onPressOut={() => handleIsComplete(task.id)}
                        className="h-8 w-8 rounded-full p-1 mt-2"
                        style={{
                          borderWidth: 1,
                          borderColor: theme.checkboxBorder,
                        }}
                      >
                        <Image
                          source={require("../assets/images/Icons/Completed.png")}
                          style={{
                            width: 20,
                            height: 20,
                            opacity: task.isCompleted ? 1 : 0,
                            tintColor: task.isCompleted
                              ? theme.checkboxTick
                              : undefined,
                          }}
                        />
                      </Pressable>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
