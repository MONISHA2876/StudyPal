import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkBuilder } from "@react-navigation/native";
import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { ICONS } from "../constants/constants";

const TAB_BAR_HEIGHT = 70;
const FAB_SIZE = 56;

function TabItem({
  route,
  isFocused,
  onPress,
  onLongPress,
}: {
  route: any;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.85, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const iconSource = ICONS[route.name];

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabItem}
    >
      <Animated.View style={[styles.iconWrapper, animStyle]}>
        <Image
          source={iconSource}
          style={[
            styles.icon,
            { tintColor: isFocused ? "#6B3FA0" : "#A889B7" },
          ]}
          contentFit="contain"
        />
        {isFocused && <View style={styles.activeDot} />}
      </Animated.View>
    </Pressable>
  );
}

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();

  // Split routes into left and right of FAB
  const leftRoutes = state.routes.slice(0, 2);
  const rightRoutes = state.routes.slice(2);

  const renderTab = (route: any) => {
    const isFocused = state.index === state.routes.indexOf(route);

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    const onLongPress = () => {
      navigation.emit({ type: "tabLongPress", target: route.key });
    };

    return (
      <TabItem
        key={route.key}
        route={route}
        isFocused={isFocused}
        onPress={onPress}
        onLongPress={onLongPress}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* ── Tab Bar Pill ── */}
      <View style={styles.pill}>
        {/* Left tabs */}
        <View style={styles.tabGroup}>{leftRoutes.map(renderTab)}</View>

        {/* FAB spacer */}
        <View style={styles.fabSpacer} />

        {/* Right tabs */}
        <View style={styles.tabGroup}>{rightRoutes.map(renderTab)}</View>
      </View>

      {/* ── FAB Center Button ── */}
      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate("create")} // change route name as needed
      >
        <View style={styles.fabInner}>
          <View style={styles.fabIcon}>
            <View style={styles.fabPlus} />
            <View style={styles.fabPlusH} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    height: TAB_BAR_HEIGHT,
    paddingHorizontal: 16,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  tabGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
  },
  fabSpacer: {
    width: FAB_SIZE + 16,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: TAB_BAR_HEIGHT,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#6B3FA0",
  },
  fab: {
    position: "absolute",
    top: -(FAB_SIZE / 2) - 4,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#FF6B6B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  fabInner: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  fabIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  fabPlus: {
    position: "absolute",
    width: 2.5,
    height: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  fabPlusH: {
    position: "absolute",
    width: 20,
    height: 2.5,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
});
