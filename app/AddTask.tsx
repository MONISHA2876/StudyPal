import DurationOptions from "@/components/DurationOptions";
import { DurationOption, Task } from "@/types/types";
import { useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HookComponentTop } from "../customHooks/SafeAreaHooks";

export default function AddTask() {
  const [duration, setDuration] = useState<number>(5);

  // NEW STATES
  const [title, setTitle] = useState("");
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [reminder, setReminder] = useState<string | null>(null);

  const handleChangeDuration = (durationOp: DurationOption) => {
    setDuration(durationOp.value);
  };

  // NEW FUNCTION
  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      createdAt: new Date().toISOString(),
      postponedTo: deadline,
      emoji: "🌱",
      color: "#E4D3F0",
      duration: duration,
      timeSlot: timeSlot,
      Categories: category ? [category] : null,
      Reminders: reminder ? [reminder] : null,
      isCompleted: false,
    };

    console.log(newTask);
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <HookComponentTop />

            <View
              style={{
                flex: 1,
                backgroundColor: "#E4D3F0",
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,
              }}
            >
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View style={{ padding: 20 }}>
                  {/* Header */}
                  <View className="flex flex-row justify-between">
                    <Image
                      source={require("../assets/images/Icons/Cross.png")}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text
                      onPress={handleAddTask}
                      className="font-bold font-inter"
                      style={{ fontSize: 15 }}
                    >
                      Add Task
                    </Text>
                  </View>

                  <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                    {/* TITLE */}
                    <View className="flex flex-row gap-4">
                      <Text style={{ margin: 10, fontSize: 40 }}>🌱</Text>

                      <View style={{ flex: 1 }}>
                        <Text className="font-inter font-bold text-lg">
                          TITLE
                        </Text>
                        <TextInput
                          placeholder="Task Title"
                          value={title}
                          onChangeText={setTitle}
                          className="w-full h-12 bg-white rounded-lg p-4 mt-2 font-inter font-medium"
                        />
                      </View>
                    </View>

                    {/* DURATION */}
                    <View style={{ marginVertical: 40, gap: 10 }}>
                      <Text className="font-inter font-bold text-lg">
                        DURATION
                      </Text>
                      <DurationOptions
                        selectDuration={handleChangeDuration}
                        selectedDuration={duration}
                      />
                    </View>

                    {/* WHEN */}
                    <View>
                      <Text className="font-inter font-bold text-lg">WHEN</Text>
                      <TextInput
                        placeholder="Anytime"
                        value={timeSlot || ""}
                        onChangeText={setTimeSlot}
                        className="w-full h-12 bg-white rounded-lg p-4 mt-2 font-inter font-medium"
                      />
                    </View>

                    {/* DEADLINE */}
                    <View style={{ marginVertical: 40, gap: 10 }}>
                      <Text className="font-inter font-bold text-lg">
                        DEADLINE
                      </Text>
                      <View className="h-12 flex flex-row bg-white rounded-lg items-center p-2">
                        <Image
                          source={require("../assets/images/Icons/Calendar_Add.png")}
                          style={{ width: 24, height: 24 }}
                        />
                        <TextInput
                          placeholder="Select Date"
                          value={deadline || ""}
                          onChangeText={setDeadline}
                          style={{ flex: 1, marginLeft: 10 }}
                          className="font-inter font-medium"
                        />
                      </View>
                    </View>

                    {/* CATEGORY */}
                    <View style={{ gap: 10 }}>
                      <Text className="font-inter font-bold text-lg">
                        CATEGORY
                      </Text>
                      <View className="h-12 flex flex-row bg-white rounded-lg items-center p-2">
                        <Image
                          source={require("../assets/images/Icons/Category.png")}
                          style={{ width: 24, height: 24 }}
                        />
                        <TextInput
                          placeholder="Select Category"
                          value={category || ""}
                          onChangeText={setCategory}
                          style={{ flex: 1, marginLeft: 10 }}
                          className="font-inter font-medium"
                        />
                      </View>
                    </View>

                    {/* REMINDER */}
                    <View style={{ marginVertical: 40, gap: 10 }}>
                      <Text className="font-inter font-bold text-lg">
                        REMINDER
                      </Text>
                      <View className="h-12 flex flex-row bg-white rounded-lg items-center p-2">
                        <Image
                          source={require("../assets/images/Icons/Alarm.png")}
                          style={{ width: 24, height: 24 }}
                        />
                        <TextInput
                          placeholder="No Reminder"
                          value={reminder || ""}
                          onChangeText={setReminder}
                          style={{ flex: 1, marginLeft: 10 }}
                          className="font-inter font-medium"
                        />
                      </View>
                    </View>

                    <View
                      className="flex w-full p-10 items-center justify-center"
                    >
                      <Text className="font-inter text-lg">
                        🌿 Small steps today. Big wins tomorrow. ✨
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}