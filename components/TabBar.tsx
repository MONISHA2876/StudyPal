import { ICONS } from "@/constants/constants";
import { useTheme } from "@/constants/ThemeContext";
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
  //@ts-ignore
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <View className="absolute bottom-0 left-4 right-4 items-center pb-safe">
      {/* Card shell */}
      <View
        className="flex-row items-center rounded-full px-6 py-3 shadow-lg shadow-black/10 w-full justify-between"
        style={{ backgroundColor: theme.tabBarBg }}
      >
        {/* Left two tabs */}
        {TABS.slice(0, 2).map(({ icon, route }) => (
          <TabButton
            key={String(route)}
            icon={icon}
            active={pathname === route}
            onPress={() => router.push(route)}
            activeColor={theme.tabIconActive}
            inactiveColor={theme.tabIconInactive}
          />
        ))}

        {/* FAB placeholder */}
        <View className="w-16" />

        {/* Right two tabs */}
        {TABS.slice(2).map(({ icon, route }) => (
          <TabButton
            key={String(route)}
            icon={icon}
            active={pathname === route}
            onPress={() => router.push(route)}
            activeColor={theme.tabIconActive}
            inactiveColor={theme.tabIconInactive}
          />
        ))}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => router.push("/AddTask" as Href)}
        activeOpacity={0.85}
        className="absolute -top-6 w-16 h-16 rounded-full items-center justify-center shadow-md shadow-black/25"
        style={{ backgroundColor: theme.fabBg }}
      >
        <View
          className="w-7 absolute"
          style={{ height: 2, backgroundColor: theme.fabIcon }}
        />
        <View
          className="h-7 absolute"
          style={{ width: 2, backgroundColor: theme.fabIcon }}
        />
      </TouchableOpacity>
    </View>
  );
}

// Reusable icon button
function TabButton({
  icon,
  active,
  onPress,
  activeColor,
  inactiveColor,
}: {
  icon: ImageSourcePropType;
  active: boolean;
  onPress: () => void;
  activeColor: string;
  inactiveColor: string;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="p-2">
      <Image
        source={icon}
        className="w-7 h-7"
        style={{ tintColor: active ? activeColor : inactiveColor }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
