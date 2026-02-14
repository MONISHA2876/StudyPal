import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HookComponentTop() {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingTop: insets.top }} />;
}

export { HookComponentTop };

