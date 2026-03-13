import DurationOptions from "@/components/DurationOptions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DurationOption, Task } from "@/constants/types";
import { useEffect, useState } from "react";
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
  Pressable,
  FlatList
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HookComponentTop } from "../customHooks/SafeAreaHooks";
import { getTask, saveTask } from "@/database/SecureStoreFunctions";
import { colors } from "@/constants/constants";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AddTaskScreen() {
  const { taskId } = useLocalSearchParams<{ taskId?: string }>();
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [ready, setReady] = useState(!taskId); // if no taskId, ready immediately

  useEffect(() => {
    if (taskId) {
      getTask(Number(taskId)).then((fetchedTask) => {
        setTask(fetchedTask);
        setReady(true);
      });
    }
  }, [taskId]);

  if (!ready) return null; // wait for task to load before mounting form

  return <AddTask key={taskId ?? "new"} task={task} />;
}

type AddTaskProps = {
  task?: Task;
};

function AddTask({ task }: AddTaskProps) {
  const router = useRouter();
  const [duration, setDuration] = useState<number>(task?.duration ?? 5);

  const generateTimeSlots = () => {
    const slots = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 5) {
        const startHour = h % 12 === 0 ? 12 : h % 12;
        const endH = (h + 1) % 24;
        const startMin = m.toString().padStart(2, "0");
        const endAmPm = endH < 12 ? "am" : "pm";
        slots.push(`${startHour}:${startMin} ${endAmPm}`);
      }
    }
    return slots;
  };

  function addMinutesToTime(timeStr: string, minutesToAdd: number): string {
    const [timePart, ampm] = timeStr.trim().split(" ");
    const [hourStr, minStr] = timePart.split(":");

    let hours = parseInt(hourStr);
    let minutes = parseInt(minStr);

    if (ampm.toLowerCase() === "pm" && hours !== 12) hours += 12;
    if (ampm.toLowerCase() === "am" && hours === 12) hours = 0;

    const totalMinutes = hours * 60 + minutes + minutesToAdd;

    let newHours = Math.floor(totalMinutes / 60) % 24;
    let newMinutes = totalMinutes % 60;

    const newAmpm = newHours < 12 ? "am" : "pm";
    let displayHours = newHours % 12;
    if (displayHours === 0) displayHours = 12;

    const displayMinutes = newMinutes.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${newAmpm}`;
  }

  const TIME_SLOTS = generateTimeSlots();
  const ITEM_HEIGHT = 44;
  const MID_INDEX = Math.floor(TIME_SLOTS.length / 2);

  const [title, setTitle] = useState(task?.title ?? "");
  const [timeSlot, setTimeSlot] = useState<string | null>(
    task?.timeSlot ?? `${TIME_SLOTS[MID_INDEX]} - ${addMinutesToTime(TIME_SLOTS[MID_INDEX], task?.duration ?? 5)}`
  );
  const [deadline, setDeadline] = useState<string | null>(task?.postponedTo ?? null);
  const [category, setCategory] = useState<string | null>(task?.Categories?.[0] ?? null);
  const [reminder, setReminder] = useState<string | null>(task?.Reminders?.[0] ?? null);
  const [color, setColor] = useState<string>(task?.color ?? "#EBCBF4");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChangeDuration = (durationOp: DurationOption) => {
    setDuration(durationOp.value);
  };

  const handleColorChange = (choosedColor: string) => {
    setColor(choosedColor);
  };

  const handleAddTask = async () => {
    const newTask: Task = {
      id: task?.id ?? Date.now(),
      title: title,
      createdAt: task?.createdAt ?? new Date().toISOString(),
      postponedTo: deadline,
      emoji: "🌱",
      color: color,
      duration: duration,
      timeSlot: timeSlot,
      Categories: category ? [category] : null,
      Reminders: reminder ? [reminder] : null,
      isCompleted: task?.isCompleted ?? false,
    };
    if (title) {
      await saveTask(newTask);
      console.log(newTask);
      router.back();
    } else {
      alert("Please add title for your task first :)");
    }
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
                backgroundColor: color,
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,
              }}
            >
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                <View style={{ padding: 20 }}>
                  {/* Header */}
                  <View className="flex flex-row justify-between">
                    <Pressable onPress={() => router.back()}>
                      <Image
                        source={require("../assets/images/Icons/Cross.png")}
                        style={{ width: 30, height: 30 }}
                      />
                    </Pressable>
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

                    {/* COLOR */}
                    <View style={{ marginTop: 40, gap: 10 }}>
                      <Text className="font-inter font-bold text-lg">
                        COLOR
                      </Text>
                      <View className="w-full flex flex-row justify-between">
                        {colors.map((item, index) => {
                          return (
                            <Pressable
                              key={index}
                              style={{
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                backgroundColor: item,
                                borderColor: "black",
                                borderWidth: 2,
                              }}
                              onPress={() => { handleColorChange(item); }}
                            />
                          );
                        })}
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
                      <View
                        style={{
                          height: ITEM_HEIGHT * 3,
                          backgroundColor: "white",
                          borderRadius: 16,
                          marginTop: 8,
                          overflow: "hidden",
                        }}
                      >
                        <FlatList
                          data={TIME_SLOTS}
                          keyExtractor={(_, index) => index.toString()}
                          showsVerticalScrollIndicator={false}
                          snapToInterval={ITEM_HEIGHT}
                          decelerationRate="fast"
                          nestedScrollEnabled={true}
                          scrollEnabled={true}
                          initialScrollIndex={MID_INDEX - 2}
                          getItemLayout={(_, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index,
                          })}
                          onScroll={(e) => {
                            const index = Math.round(
                              (e.nativeEvent.contentOffset.y / ITEM_HEIGHT) + 1
                            );
                            if (TIME_SLOTS[index] && TIME_SLOTS[index] !== timeSlot) {
                              setTimeSlot(TIME_SLOTS[index]);
                            }
                          }}
                          scrollEventThrottle={16}
                          renderItem={({ item }) => {
                            const isSelected = timeSlot === item;
                            return (
                              <Pressable
                                onPress={() => setTimeSlot(item)}
                                style={{
                                  height: ITEM_HEIGHT,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <View
                                  style={{
                                    height: ITEM_HEIGHT - 4,
                                    width: "90%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: isSelected ? "#E8E8E8" : "transparent",
                                    borderRadius: isSelected ? 10 : 0,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: isSelected ? 16 : 13,
                                      fontWeight: isSelected ? "600" : "400",
                                      color: isSelected ? "#000" : "#999",
                                    }}
                                  >
                                    {isSelected ? `${item} - ${addMinutesToTime(item, duration)}` : item}
                                  </Text>
                                </View>
                              </Pressable>
                            );
                          }}
                        />
                      </View>
                    </View>

                    {/* DEADLINE */}
                    <View style={{ marginVertical: 40, gap: 10 }}>
                      <Text className="font-inter font-bold text-lg">DEADLINE</Text>
                      <View className="h-12 flex flex-row bg-white rounded-lg items-center p-2">
                        <Pressable onPress={() => setShowDatePicker(true)}>
                          <Image
                            source={require("../assets/images/Icons/Calendar_Add.png")}
                            style={{ width: 24, height: 24 }}
                          />
                        </Pressable>
                        <TextInput
                          placeholder="Select Date"
                          value={deadline || ""}
                          onChangeText={(text) => {
                            const cleaned = text.replace(/[^0-9]/g, "");
                            let formatted = cleaned;
                            if (cleaned.length >= 5) {
                              formatted = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
                            }
                            if (cleaned.length >= 7) {
                              formatted = cleaned.slice(0, 4) + "-" + cleaned.slice(4, 6) + "-" + cleaned.slice(6, 8);
                            }
                            setDeadline(formatted.slice(0, 10));
                          }}
                          keyboardType="numeric"
                          maxLength={10}
                          style={{ flex: 1, marginLeft: 10 }}
                          className="font-inter font-medium"
                        />
                      </View>
                      {showDatePicker && (
                        <DateTimePicker
                          value={deadline ? new Date(deadline) : new Date()}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                              const iso = selectedDate.toISOString().split("T")[0];
                              setDeadline(iso);
                            }
                          }}
                        />
                      )}
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

                    <View className="flex w-full p-10 items-center justify-center">
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