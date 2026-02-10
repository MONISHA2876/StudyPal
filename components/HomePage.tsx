import { useState } from "react";
import { Text, View } from "react-native";
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
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // You can also fetch tasks for the selected date here
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

      <View id="tasksList" className="w-screen h-full bg-gray-100">
        {/* We will show task list according to the selected date */}
      </View>
    </SafeAreaView>
  );
}
