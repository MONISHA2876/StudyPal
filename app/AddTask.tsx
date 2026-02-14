import DurationOptions from "@/components/DurationOptions";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HookComponentTop } from "../customHooks/SafeAreaHooks";

export default function AddTask() {
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
              className="w-screen h-full overflow-hidden"
              style={{
                backgroundColor: "#E4D3F0",
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,
                padding: 20,
              }}
            >
              <View className="flex flex-row justify-between">
                <Image
                  source={require("../assets/images/Icons/Cross.png")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text className="font-bold font-inter" style={{ fontSize: 15 }}>
                  Add Task
                </Text>
              </View>

              <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                <View className="flex flex-row gap-4">
                  <View>
                    <Text style={{ margin: 10, fontSize: 40 }}>🌱</Text>
                  </View>
                  <View className="overflow-hidden" style={{ flex: 1 }}>
                    <Text className="font-inter font-bold font-xl">TITLE</Text>
                    <TextInput
                      placeholder="Task Title"
                      className="w-full h-12 bg-white rounded-lg p-4 mt-2 font-inter font-medium"
                    />
                  </View>
                </View>

                <View
                  className="flex flex-col"
                  style={{ marginVertical: 40, gap: 10 }}
                >
                  <Text className="font-inter font-bold font-xl">DURATION</Text>
                  <DurationOptions />
                </View>

                <View>
                  <Text className="font-inter font-bold font-xl">WHEN</Text>
                  <TextInput
                    placeholder="Anytime"
                    className="w-full h-12 bg-white rounded-lg p-4 mt-2 font-inter font-medium"
                  />
                </View>

                <View style={{ marginVertical: 40, gap: 10 }}>
                  <Text className="font-inter font-bold font-xl">DEADLINE</Text>
                  <View
                    className=" h-12 flex flex-row bg-white rounded-lg"
                    style={{
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Image
                      source={require("../assets/images/Icons/Calendar_Add.png")}
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                    <TextInput
                      placeholder="Select Date"
                      className="h-12 bg-white rounded-lg p-4 font-inter font-medium pl-10"
                    />
                  </View>
                </View>

                <View style={{ gap: 10 }}>
                  <Text className="font-inter font-bold font-xl">CATEGORY</Text>
                  <View
                    className=" h-12 flex flex-row bg-white rounded-lg"
                    style={{
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Image
                      source={require("../assets/images/Icons/Category.png")}
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                    <TextInput
                      placeholder="Select Category"
                      className="h-12 bg-white rounded-lg p-4 font-inter font-medium pl-10"
                    />
                  </View>
                </View>

                <View style={{ marginVertical: 40, gap: 10 }}>
                  <Text className="font-inter font-bold font-xl">REMINDER</Text>
                  <View
                    className=" h-12 flex flex-row bg-white rounded-lg"
                    style={{
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Image
                      source={require("../assets/images/Icons/Alarm.png")}
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                    <TextInput
                      placeholder="No Reminder"
                      className="h-12 bg-white rounded-lg p-4 font-inter font-medium pl-10"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
