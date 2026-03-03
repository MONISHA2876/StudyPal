import { View, Text, TouchableOpacity, Animated, Easing, Pressable } from "react-native";
import { useLocalSearchParams, useFocusEffect, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useRef } from "react";

export default function TaskDetails() {
  const { timeslot, emoji, title, duration, categories, color } =
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

  // ── Animated values ──────────────────────────────────────────────
  const cardSlide        = useRef(new Animated.Value(60)).current;
  const cardOpacity      = useRef(new Animated.Value(0)).current;
  const headerScale      = useRef(new Animated.Value(0.85)).current;
  const badgeOpacity     = useRef(new Animated.Value(0)).current;
  const badgeSlide       = useRef(new Animated.Value(20)).current;
  const pomodoroScale    = useRef(new Animated.Value(0.8)).current;
  const pomodoroOpacity  = useRef(new Animated.Value(0)).current;
  const checkPulse       = useRef(new Animated.Value(1)).current;
  const bottomBarSlide   = useRef(new Animated.Value(80)).current;
  const bottomBarOpacity = useRef(new Animated.Value(0)).current;

  // Keep a ref to the loop so we can stop it on blur
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  // ── useFocusEffect: reset + replay every time the screen is focused ──
  useFocusEffect(
    useCallback(() => {
      // 1. Reset all values to their initial (hidden) state
      cardSlide.setValue(60);
      cardOpacity.setValue(0);
      headerScale.setValue(0.85);
      badgeOpacity.setValue(0);
      badgeSlide.setValue(20);
      pomodoroScale.setValue(0.8);
      pomodoroOpacity.setValue(0);
      checkPulse.setValue(1);
      bottomBarSlide.setValue(80);
      bottomBarOpacity.setValue(0);

      // 2. Card entrance
      Animated.parallel([
        Animated.timing(cardSlide, {
          toValue: 0,
          duration: 480,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();

      // 3. Header scale-in with spring overshoot
      Animated.timing(headerScale, {
        toValue: 1,
        duration: 500,
        delay: 100,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true,
      }).start();

      // 4. Badges slide in from left
      Animated.parallel([
        Animated.timing(badgeOpacity, {
          toValue: 1,
          duration: 350,
          delay: 280,
          useNativeDriver: true,
        }),
        Animated.timing(badgeSlide, {
          toValue: 0,
          duration: 350,
          delay: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      // 5. Pomodoro spring pop
      Animated.parallel([
        Animated.timing(pomodoroOpacity, {
          toValue: 1,
          duration: 350,
          delay: parsedCategories.length > 0 ? 420 : 280,
          useNativeDriver: true,
        }),
        Animated.spring(pomodoroScale, {
          toValue: 1,
          delay:  parsedCategories.length > 0 ? 420 : 280,
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }),
      ]).start();

      // 6. Bottom bar slides up
      Animated.parallel([
        Animated.timing(bottomBarSlide, {
          toValue: 0,
          duration: 450,
          delay: 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(bottomBarOpacity, {
          toValue: 1,
          duration: 350,
          delay: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // 7. Start the infinite pulse loop on the check circle
      pulseLoop.current = Animated.loop(
        Animated.sequence([
          Animated.timing(checkPulse, {
            toValue: 1.1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(checkPulse, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.current.start();

      // Cleanup: stop loop when screen blurs
      return () => {
        pulseLoop.current?.stop();
      };
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-4 pb-6 justify-center items-baseline gap-4">

        {/* ── Card ── */}
        <Animated.View
          style={{ opacity: cardOpacity, transform: [{ translateY: cardSlide }], backgroundColor: color, width:"100%" }}
          className=" rounded-lg p-6 shadow-2xl flex gap-4"
        >
          {/* Timeslot */}
          <Text className="text-[#3F3939] font-normal font-md font-inter opacity-[51%] tracking-widest mb-3">
            {timeslot || "Any Time"}
          </Text>

          {/* Title row */}
          <Animated.View
            style={{ transform: [{ scale: headerScale }] }}
            className="flex-row items-center mb-3"
          >
            <Text className="font-bold font-inter font-2xl" style={{fontSize:20, marginRight:4}}>{emoji ?? "🍜"}</Text>

            <Text
              className="flex-1 text-black font-bold font-inter font-2xl leading-7"
              numberOfLines={2}
              style={{fontSize:20}}
            >
              {title}
            </Text>

          </Animated.View>

          {/* Duration */}
          <Animated.Text
            style={{ transform: [{ translateX: badgeSlide }] }}
            className="text-[#3F3939] font-normal font-md font-inter opacity-[51%] tracking-wide mb-3"
          >
            {duration ? `${duration} minutes` : "All day"}
          </Animated.Text>

          {/* Category badges */}
          <Animated.View
            style={{ opacity: badgeOpacity, transform: [{ translateX: badgeSlide }] }}
            className="flex-row flex-wrap gap-2 mb-5"
          >
            {(parsedCategories.length > 0 ? parsedCategories : []).map(
              (cat: string, i: number) => (
                <View
                  key={i}
                  style={{ backgroundColor: color + "28" }}
                  className="px-3 py-1.5 rounded-full"
                >
                  <Text
                    style={{ color: color }}
                    className="text-xs font-semibold tracking-wide"
                  >
                    {cat}
                  </Text>
                </View>
              )
            )}
          </Animated.View>

          {/* Divider */}
          <View className="text-[#3F3939] opacity-[51%]" style={{height:2, marginVertical: 10}} />

          {/* Pomodoro row */}
          <Link href="../Pomodoro">
            <Animated.View
                style={{ opacity: pomodoroOpacity, transform: [{ scale: pomodoroScale }] }}
                className="flex-row items-center gap-2"
            >
                
                <Text style={{fontSize:25, marginRight:5}}>⏱</Text>
                <Text className="text-[#3D3048] text-2xl font-semibold font-inter tracking-tight" style={{fontSize:15}}>
                Start Pomodoro
                </Text>
                
            </Animated.View>
            </Link>

        </Animated.View>

        {/* ── Bottom bar ── */}
        <Animated.View
          style={{
            opacity: bottomBarOpacity,
            transform: [{ translateY: bottomBarSlide }],
          }}
          className="flex-row items-center gap-3 pt-4"
        >

          {/* Edit Task button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={{ backgroundColor: color}}
            className="flex-1 p-6 rounded-xl items-center justify-center shadow-lg"
          >
            <Text className="text-black text-base font-bold tracking-wide">
              Edit Task
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}