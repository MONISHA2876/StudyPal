import { ICONS } from "@/constants/constants";
import type { Href } from "expo-router";
import { router, usePathname } from "expo-router";
import type { ImageSourcePropType } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";

// Asset imports
const HomeIcon = ICONS.index;
const CalendarIcon = ICONS.calendar;
const StatsIcon = ICONS.stats;
const EditIcon = ICONS.edit;

// Route map
const TABS: { icon: ImageSourcePropType; route: Href }[] = [
  { icon: HomeIcon, route: "/" as Href },
  { icon: CalendarIcon, route: "/schedule" as Href },
  { icon: StatsIcon, route: "/stats" as Href },
  { icon: EditIcon, route: "/notes" as Href },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    /**
     * Outer wrapper — floats above the bottom edge.
     * pb-safe respects the device home-indicator inset (NativeWind v4).
     */
    <View className="absolute bottom-0 left-4 right-4 items-center pb-safe">
      {/* Card shell */}
      <View className="flex-row items-center bg-white rounded-full px-6 py-3 shadow-lg shadow-black/10 w-full justify-between">
        {/* Left two tabs */}
        {TABS.slice(0, 2).map(({ icon, route }) => (
          <TabButton
            key={String(route)}
            icon={icon}
            active={pathname === route}
            onPress={() => router.push(route)}
          />
        ))}

        {/* FAB placeholder — the floating "+" button sits above this gap */}
        <View className="w-16" />

        {/* Right two tabs */}
        {TABS.slice(2).map(({ icon, route }) => (
          <TabButton
            key={String(route)}
            icon={icon}
            active={pathname === route}
            onPress={() => router.push(route)}
          />
        ))}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => router.push("/AddTask" as Href)}
        activeOpacity={0.85}
        className="absolute -top-6 w-16 h-16 rounded-full bg-[#F4635A] items-center justify-center shadow-md shadow-black/25"
      >
        {/* "+" drawn with two plain Views — no icon library needed */}
        <View className="w-7 h-[2px] bg-white absolute" />
        <View className="w-[2px] h-7 bg-white absolute" />
      </TouchableOpacity>
    </View>
  );
}

// Reusable icon button
function TabButton({
  icon,
  active,
  onPress,
}: {
  icon: ImageSourcePropType; // correct type for require() image sources
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="p-2">
      <Image
        source={icon}
        className="w-7 h-7"
        style={{ tintColor: active ? "#6B4EFF" : "#9CA3AF" }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
