import { useTheme } from "@/constants/ThemeContext";
import { handleEdit } from "@/database/DatabaseFunctions";
import { deleteTask } from "@/database/SecureStoreFunctions";
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskDetails() {
  //@ts-ignore
  const { theme } = useTheme();

  const { id, timeslot, emoji, title, duration, categories, color } =
    useLocalSearchParams<{
      id?: string;
      timeslot?: string;
      emoji?: string;
      title?: string;
      duration?: string;
      categories?: string;
      color?: string;
    }>();

  const parsedCategories = (() => {
    try {
      return categories ? JSON.parse(categories) : [];
    } catch {
      return [];
    }
  })();

  const safeColor = color ?? theme.cardDefault;

  const handleDeleteTask = async (idOfTaskToDelete: number) => {
    await deleteTask(idOfTaskToDelete);
    router.back();
  };

  // ── Shared Values ─────────────────────────────────────────────
  const cardSlide = useSharedValue(60);
  const cardOpacity = useSharedValue(0);
  const headerScale = useSharedValue(0.85);
  const badgeOpacity = useSharedValue(0);
  const badgeSlide = useSharedValue(20);
  const pomodoroScale = useSharedValue(0.9);
  const pomodoroOpacity = useSharedValue(0);
  const checkPulse = useSharedValue(1);
  const bottomBarSlide = useSharedValue(80);
  const bottomBarOpacity = useSharedValue(0);

  // ── Animated Styles ───────────────────────────────────────────
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardSlide.value }],
  }));

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ translateX: badgeSlide.value }],
  }));

  const durationStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: badgeSlide.value }],
  }));

  const pomodoroStyle = useAnimatedStyle(() => ({
    opacity: pomodoroOpacity.value,
    transform: [{ scale: pomodoroScale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkPulse.value }],
  }));

  const bottomBarStyle = useAnimatedStyle(() => ({
    opacity: bottomBarOpacity.value,
    transform: [{ translateY: bottomBarSlide.value }],
  }));

  // ── useFocusEffect ────────────────────────────────────────────
  useFocusEffect(
    useCallback(() => {
      cardSlide.value = 60;
      cardOpacity.value = 0;
      headerScale.value = 0.85;
      badgeOpacity.value = 0;
      badgeSlide.value = 20;
      pomodoroScale.value = 0.9;
      pomodoroOpacity.value = 0;
      checkPulse.value = 1;
      bottomBarSlide.value = 80;
      bottomBarOpacity.value = 0;

      cardSlide.value = withTiming(0, {
        duration: 480,
        easing: Easing.out(Easing.cubic),
      });
      cardOpacity.value = withTiming(1, { duration: 400 });

      headerScale.value = withDelay(
        100,
        withTiming(1, { duration: 500, easing: Easing.out(Easing.back(1.4)) }),
      );

      badgeOpacity.value = withDelay(280, withTiming(1, { duration: 350 }));
      badgeSlide.value = withDelay(
        280,
        withTiming(0, { duration: 350, easing: Easing.out(Easing.cubic) }),
      );

      const pomodoroDelay = parsedCategories.length > 0 ? 420 : 280;
      pomodoroOpacity.value = withDelay(
        pomodoroDelay,
        withTiming(1, { duration: 350 }),
      );
      pomodoroScale.value = withDelay(
        pomodoroDelay,
        withSpring(1, { damping: 10, stiffness: 120 }),
      );

      bottomBarSlide.value = withDelay(
        200,
        withTiming(0, { duration: 450, easing: Easing.out(Easing.cubic) }),
      );
      bottomBarOpacity.value = withDelay(200, withTiming(1, { duration: 350 }));

      checkPulse.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );

      return () => {
        cancelAnimation(checkPulse);
      };
    }, []),
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <View className="flex-1 px-4 pt-4 pb-6 justify-center items-stretch gap-4">
        {/* ── Card ── */}
        <Animated.View
          style={[cardStyle, { backgroundColor: safeColor, width: "100%" }]}
          className="rounded-lg p-6 shadow-2xl flex gap-4"
        >
          {/* Timeslot */}
          <Text
            className="font-normal font-inter opacity-[51%] tracking-widest mb-3"
            style={{ color: theme.cardTime }}
          >
            {timeslot || "Any Time"}
          </Text>

          {/* Title row */}
          <Animated.View
            style={headerStyle}
            className="flex-row items-center mb-3"
          >
            <Text
              className="font-bold font-inter"
              style={{ fontSize: 20, marginRight: 4 }}
            >
              {emoji ?? "🍜"}
            </Text>
            <Text
              className="flex-1 font-bold font-inter leading-7"
              numberOfLines={2}
              style={{ fontSize: 20, color: theme.cardTitle }}
            >
              {title}
            </Text>
          </Animated.View>

          {/* Duration */}
          <Animated.Text
            style={[
              durationStyle,
              {
                color: theme.cardDuration,
                opacity: 0.51,
                letterSpacing: 1,
              },
            ]}
            className="font-normal font-inter tracking-widest mb-3"
          >
            {duration ? `${duration} minutes` : "All day"}
          </Animated.Text>

          {/* Category badges */}
          <Animated.View
            style={[
              badgeStyle,
              {
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 20,
              },
            ]}
          >
            {parsedCategories.map((cat: string, i: number) => (
              <View
                key={i}
                style={{ backgroundColor: theme.accentLight }}
                className="px-3 py-1.5 rounded-full"
              >
                <Text
                  style={{ color: theme.accent }}
                  className="text-xs font-semibold tracking-wide"
                >
                  {cat}
                </Text>
              </View>
            ))}
          </Animated.View>

          {/* Divider */}
          <View
            style={{
              height: 2,
              marginVertical: 10,
              backgroundColor: theme.border,
              opacity: 0.6,
            }}
          />

          {/* Pomodoro row */}
          <Animated.View
            style={[
              pomodoroStyle,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View className="flex flex-row items-center justify-between w-full">
              <Link href="../Pomodoro">
                <View className="flex flex-row gap-2 items-center">
                  <Text style={{ fontSize: 25, marginRight: 5 }}>⏱</Text>
                  <Text
                    className="font-semibold font-inter"
                    style={{ fontSize: 15, color: theme.accent }}
                  >
                    Start Pomodoro
                  </Text>
                </View>
              </Link>
              <Pressable onPress={() => handleDeleteTask(Number(id))}>
                <Text style={{ fontSize: 25, margin: 5 }}>🗑️</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Animated.View>

        {/* ── Bottom bar ── */}
        <Animated.View
          style={[
            bottomBarStyle,
            {
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingTop: 16,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            style={{ backgroundColor: theme.accent }}
            className="flex-1 p-6 rounded-xl items-center justify-center shadow-lg"
            onPress={() => handleEdit(Number(id), router)}
          >
            <Text
              className="text-base font-bold tracking-wide"
              style={{ color: theme.accentText }}
            >
              Edit Task
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
