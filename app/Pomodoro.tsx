import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState, useCallback } from "react";
import { useFonts } from "expo-font";

// ── Types ─────────────────────────────────────────────────────────────────────
type Mode = "focus" | "short" | "long";

interface ModeConfig {
  label: string;
  duration: number;
  bg: string;
  text: string;
  subText: string;
  btnBg: string;
  activeBtnBg: string;
  statusBar: "dark-content" | "light-content";
}

// ── Mode configs ───────────────────────────────────────────────────────────────
const MODES: Record<Mode, ModeConfig> = {
  focus: {
    label: "Focus",
    duration: 25 * 60,
    bg: "#FFF0EE",
    text: "#3D0A0A",
    subText: "#7A2020",
    btnBg: "#F8D4D0",
    activeBtnBg: "#F0948C",
    statusBar: "dark-content",
  },
  short: {
    label: "Short Break",
    duration: 5 * 60,
    bg: "#EDFAF2",
    text: "#0D2B1A",
    subText: "#1A5C35",
    btnBg: "#C8EDD8",
    activeBtnBg: "#80D4A4",
    statusBar: "dark-content",
  },
  long: {
    label: "Long Break",
    duration: 15 * 60,
    bg: "#EBF4FD",
    text: "#0D1F3C",
    subText: "#1A3F6F",
    btnBg: "#C4DCF0",
    activeBtnBg: "#7AAEDD",
    statusBar: "dark-content",
  },
};

// ── Badge images — static requires (Metro bundler requirement) ─────────────────
const BADGE_IMAGES: Record<Mode, any> = {
  focus: require("../assets/images/Badges/focus.png"),
  short: require("../assets/images/Badges/short.png"),
  long:  require("../assets/images/Badges/long.png"),
};

// ── Session sequence ───────────────────────────────────────────────────────────
const MODE_ORDER: Mode[] = ["focus", "short", "focus", "short", "focus", "long"];

// ── Helper ─────────────────────────────────────────────────────────────────────
function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function PomodoroTimer() {
  // Load Oswald-Black font — place Oswald-Black.ttf in assets/fonts/
  const [fontsLoaded] = useFonts({
    "Oswald-Black": require("../assets/fonts/Oswald-Black.ttf"),
  });

  const [mode, setMode]         = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [running, setRunning]   = useState(false);
  const [session, setSession]   = useState(1);

  const cfg     = MODES[mode];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const modeIdxRef   = useRef(0);

  // ── Animated values ────────────────────────────────────────────────────────
  const bgFade       = useRef(new Animated.Value(1)).current;
  const badgeScale   = useRef(new Animated.Value(1)).current;
  const btnScale     = useRef(new Animated.Value(1)).current;
  const blinkAnim    = useRef(new Animated.Value(1)).current;
  const blinkLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  // ── Blink when ≤ 10 seconds remain and timer is running ───────────────────
  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0 && running) {
      blinkLoopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0.2,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      blinkLoopRef.current.start();
    } else {
      blinkLoopRef.current?.stop();
      blinkAnim.setValue(1);
    }
  }, [timeLeft, running]);

  // ── Mode-change animation ──────────────────────────────────────────────────
  const animateModeChange = useCallback(() => {
    Animated.sequence([
      Animated.timing(bgFade, { toValue: 0.6, duration: 150, useNativeDriver: true }),
      Animated.timing(bgFade, { toValue: 1,   duration: 300, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.timing(badgeScale, { toValue: 0.85, duration: 120, useNativeDriver: true }),
      Animated.spring(badgeScale, { toValue: 1, friction: 5, tension: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  // ── Timer tick ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            handleSessionEnd();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  // ── Session end ───────────────────────────────────────────────────────────
  function handleSessionEnd() {
    setRunning(false);
    blinkLoopRef.current?.stop();
    blinkAnim.setValue(1);

    modeIdxRef.current = (modeIdxRef.current + 1) % MODE_ORDER.length;
    const nextMode = MODE_ORDER[modeIdxRef.current];

    setMode(nextMode);
    setTimeLeft(MODES[nextMode].duration);
    animateModeChange();

    if (nextMode === "focus") setSession((s) => s + 1);
  }

  // ── Manual mode switch ────────────────────────────────────────────────────
  function switchMode(newMode: Mode) {
    clearInterval(intervalRef.current!);
    blinkLoopRef.current?.stop();
    blinkAnim.setValue(1);
    setRunning(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode].duration);
    modeIdxRef.current = MODE_ORDER.indexOf(newMode);
    animateModeChange();
  }

  // ── Controls ──────────────────────────────────────────────────────────────
  function togglePlay() {
    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.9, duration: 80, useNativeDriver: true }),
      Animated.spring(btnScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    setRunning((r) => !r);
  }

  function skipSession() {
    clearInterval(intervalRef.current!);
    handleSessionEnd();
  }

  function resetTimer() {
    clearInterval(intervalRef.current!);
    blinkLoopRef.current?.stop();
    blinkAnim.setValue(1);
    setRunning(false);
    setTimeLeft(cfg.duration);
  }

  const progress  = 1 - timeLeft / cfg.duration;
  const isBlinking = timeLeft <= 10 && running;

  // Wait for font before rendering
  if (!fontsLoaded) return null;

  return (
    <Animated.View style={{ flex: 1, backgroundColor: cfg.bg, opacity: bgFade }}>
      <StatusBar barStyle={cfg.statusBar} backgroundColor={cfg.bg} />
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-between px-8 pb-4 pt-2">

          {/* ── Top: progress bar + session count ── */}
          <View className="w-full" style={{ gap: 10 }}>
            <View
              style={{ backgroundColor: cfg.btnBg }}
              className="w-full h-1.5 rounded-full overflow-hidden"
            >
              <View
                style={{
                  width: `${progress * 100}%`,
                  backgroundColor: cfg.activeBtnBg,
                }}
                className="h-full rounded-full"
              />
            </View>

            <View className="w-full flex-row justify-end">
              <Text
                style={{ color: cfg.subText }}
                className="text-sm font-semibold opacity-60"
              >
                Session {session}
              </Text>
            </View>
          </View>

          {/* ── Centre: badge + digits + controls ── */}
          <View className="w-full items-center" style={{ gap: 20, marginBottom:20 }}>

            {/* Badge */}
            <Animated.View style={{ transform: [{ scale: badgeScale }] }}>
              <Image
                source={BADGE_IMAGES[mode]}
                style={{ height: 40, width: 180 }}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Timer digits */}
            <View
              className="items-center w-full"
              style={{ gap: 0 }}
            >
              <Animated.Text
                style={{
                  fontFamily: "Oswald-Black",
                  color: cfg.text,
                  fontSize: 190,
                  lineHeight: 200,
                  letterSpacing: -4,
                  width: "100%",
                  textAlign: "center",
                  fontVariant: ["tabular-nums"],
                  opacity: isBlinking ? blinkAnim : 1,
                }}
              >
                {pad(minutes)}
              </Animated.Text>

              <Animated.Text
                style={{
                  fontFamily: "Oswald-Black",
                  color: cfg.subText,
                  fontSize: 190,
                  lineHeight: 200,
                  letterSpacing: -4,
                  width: "100%",
                  textAlign: "center",
                  fontVariant: ["tabular-nums"],
                  opacity: isBlinking ? blinkAnim : 1,
                }}
              >
                {pad(seconds)}
              </Animated.Text>
            </View>

            {/* Controls */}
            <View className="flex-row items-center gap-4">

              {/* Reset */}
              <TouchableOpacity
                onPress={resetTimer}
                activeOpacity={0.7}
                style={{ backgroundColor: cfg.btnBg }}
                className="w-16 h-14 rounded-2xl items-center justify-center"
              >
                <Text style={{ color: cfg.text }} className="text-xl">···</Text>
              </TouchableOpacity>

              {/* Play / Pause */}
              <Animated.View style={{ transform: [{ scale: btnScale }] }}>
                <TouchableOpacity
                  onPress={togglePlay}
                  activeOpacity={0.85}
                  style={{ backgroundColor: cfg.activeBtnBg }}
                  className="w-24 h-16 rounded-3xl items-center justify-center shadow-md"
                >
                  <Text style={{ color: cfg.text }} className="text-2xl font-bold">
                    {running ? "⏸" : "▶"}
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Skip */}
              <TouchableOpacity
                onPress={skipSession}
                activeOpacity={0.7}
                style={{ backgroundColor: cfg.btnBg }}
                className="w-16 h-14 rounded-2xl items-center justify-center"
              >
                <Text style={{ color: cfg.text }} className="text-xl">⏭</Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* ── Mode switcher tabs ── */}
          <View className="flex-row gap-2">
            {(["focus", "short", "long"] as Mode[]).map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => switchMode(m)}
                activeOpacity={0.7}
                style={{
                  backgroundColor: mode === m ? cfg.activeBtnBg : cfg.btnBg,
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: cfg.text,
                    fontSize: 12,
                    fontWeight: mode === m ? "700" : "500",
                    opacity: mode === m ? 1 : 0.6,
                  }}
                >
                  {MODES[m].label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </SafeAreaView>
    </Animated.View>
  );
}