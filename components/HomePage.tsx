import { getValueFor, save } from "@/database/SecureStoreFunctions";
import { Task } from "@/constants/types";
import { Link, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HookComponentTop } from "../customHooks/SafeAreaHooks";
import HorizontalCalendar from "./HorizontalCalender";

export default function HomePage() {
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
    }, [])
  );

  useEffect(() => {
    const filtered = allTasks.filter((task) => {
      // Convert both dates to same format for comparison
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
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );

    setAllTasks(updated);
    save("Tasks", JSON.stringify(updated));
  };

  return (
    <SafeAreaView className="bg-white w-screen min-h-screen flex items-center justify-center">
      <HookComponentTop />
      <View
        id="header"
        className="bg-[#E4D3F0] h-80 w-screen flex items-center justify-center"
        style={{ paddingTop: 100 }}
      >
        <Text className="font-pompiere text-4xl font-thin w-full text-center p-2 px-4">
          Today
        </Text>
        <Text className="font-inter text-md font-bold w-full text-center pb-2 px-4">
          🌱 Trust the Process, Trust Yourself
        </Text>
        <View id="calendar" className="w-full">
          <HorizontalCalendar onDateChange={handleDateChange} />
        </View>
      </View>

      <View
        id="tasksList"
        className="w-screen h-full bg-gray-100 items-center justify-start p-6"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full h-full items-center justify-start gap-6">
        {filteredTasks.length === 0 ? (
          <View className="w-full p-8 flex items-center justify-center">
            <Text className="font-inter text-lg text-gray-500 text-center">
              🌿 No tasks for this day
            </Text>
            <Text className="font-inter text-sm text-gray-400 text-center mt-2">
              Add a task to get started!
            </Text>
          </View>
        ) : (
          filteredTasks.map((task) => {
            return (
              <View
                key={task.id}
                className="w-full rounded-lg p-4 flex flex-row justify-between"
                style={{ backgroundColor: task.color }}
              >
                <Link
                  href={{
                    pathname: "/task/[id]",
                    params: { 
                      id:task.id,
                      timeslot:task.timeSlot,
                      emoji:task.emoji,
                      title:task.title,
                      duration:task.duration,
                      categories:task.Categories,
                      color: task.color,
                     },
                  }}
                  asChild
                >
                  <Pressable className="flex justify-start items-start gap-4 flex-1">
                    <Text className="text-[#3F3939] font-normal font-md font-inter opacity-[51%]">
                      {task.timeSlot || "Any Time"}
                    </Text>
                    <Text className="text-black font-bold font-inter font-xl">
                      {task.emoji} {task.title}
                    </Text>
                    <Text className="text-[#3F3939] font-normal font-md font-inter opacity-[51%]">
                      {task.duration ? `${task.duration} minutes` : "All day"}
                    </Text>
                  </Pressable>
                </Link>
                <View className="flex justify-start items-end">
                  <Text className="text-[#3F3939] font-normal font-md font-inter opacity-[51%]">
                    {task.Categories ? task.Categories.join(", ") : " "}
                  </Text>
                  <Pressable
                    onPressOut={() => handleIsComplete(task.id)}
                    className="border border-black h-8 w-8 rounded-full p-1 mt-2"
                  >
                    <Image
                      source={require("../assets/images/Icons/Completed.png")}
                      style={{
                        width: 20,
                        height: 20,
                        opacity: task.isCompleted ? 1 : 0,
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