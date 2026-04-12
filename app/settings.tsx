import { Button, Text, View } from "react-native";


export default function Settings() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Choose Theme</Text>
      <Button
        title="Light"
        onPress={() => console.log("Light theme selected")}
      />
      <Button title="Dark" onPress={() => console.log("Dark theme selected")} />
      <Button
        title="System Default"
        onPress={() => console.log("System default theme selected")}
      />
    </View>
  );
}
