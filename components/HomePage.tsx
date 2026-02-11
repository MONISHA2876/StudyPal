import { sampleTasks } from "@/test/data";
import { Task } from "@/types/types";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import HorizontalCalendar from "./HorizontalCalender";

function HookComponent() {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingTop: insets.top }} />;
}

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  let filteredTasks: Task[] = [];

  let filterTask = () => {
    filteredTasks = sampleTasks.filter((task) => {
      if (task.createdAt.toDateString() === selectedDate.toDateString()) {
        return true;
      }
    });
  };
  filterTask();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    filterTask();
  };

  const handleIsComplete = () => {
    console.log("Task completed!");
  };

  return (
    <SafeAreaView className="bg-white w-screen min-h-screen flex items-center justify-center">
      <HookComponent />
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
        className="w-screen h-full bg-gray-100 flex items-center justify-start p-6 gap-6"
      >
        {filteredTasks.map((task) => {
          return (
            <View
              key={task.id}
              className="w-full rounded-lg p-4 flex flex-row justify-between"
              style={{ backgroundColor: task.color }}
            >
              <View className="flex justify-start items-start gap-4">
                <Text className="text-[#3F3939] font-normal font-md font-inter opacity-[51%]">
                  {task.timeSlot || "Any Time"}
                </Text>
                <Text className="text-black font-bold font-inter font-xl">
                  {task.emoji} {task.title}
                </Text>
                <Text className="text-[#3F3939] font-normal font-md font-inter opacity-[51%]">
                  {task.duration ? `${task.duration} minutes` : "All day"}
                </Text>
              </View>
              <View className="flex justify-start items-end">
                <Text className="text-[#3F3939] font-normal font-md font-inter opacity-[51%]">
                  {task.Categories ? task.Categories.join(", ") : " "}
                </Text>
                <Pressable
                  onPressOut={handleIsComplete}
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
        })}
      </View>
    </SafeAreaView>
  );
}
