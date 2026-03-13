import React, { useEffect, useRef, useState, useCallback } from "react";
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
import { useFonts } from "expo-font";

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

const BADGE_IMAGES: Record<Mode, any> = {
  focus: require("../assets/images/Badges/focus.png"),
  short: require("../assets/images/Badges/short.png"),
  long: require("../assets/images/Badges/long.png"),
};

const MODE_ORDER: Mode[] = ["focus", "short", "focus", "short", "focus", "long"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function PomodoroTimer() {
  // FIX 1: Don't return null on font load failure — fall back to system font
  const [fontsLoaded] = useFonts({
    "Oswald-Black": require("../assets/fonts/Oswald-Black.ttf"),
  });

  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState(1);

  const cfg = MODES[mode];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const modeIdxRef = useRef(0);

  const bgFade = useRef(new Animated.Value(1)).current;
  const badgeScale = useRef(new Animated.Value(1)).current;
  const btnScale = useRef(new Animated.Value(1)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const blinkLoopRef = useRef<Animated.CompositeAnimation | null>(null);

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

  const animateModeChange = useCallback(() => {
    Animated.sequence([
      Animated.timing(bgFade, { toValue: 0.6, duration: 150, useNativeDriver: true }),
      Animated.timing(bgFade, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.timing(badgeScale, { toValue: 0.85, duration: 120, useNativeDriver: true }),
      Animated.spring(badgeScale, { toValue: 1, friction: 5, tension: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  // FIX 2: Stable callback ref so interval never captures a stale version
  const handleSessionEnd = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    blinkLoopRef.current?.stop();
    blinkAnim.setValue(1);
    setRunning(false);

    modeIdxRef.current = (modeIdxRef.current + 1) % MODE_ORDER.length;
    const nextMode = MODE_ORDER[modeIdxRef.current];

    setMode(nextMode);
    setTimeLeft(MODES[nextMode].duration);
    animateModeChange();

    if (nextMode === "focus") setSession((s) => s + 1);
  }, [animateModeChange]);

  // FIX 3: handleSessionEnd in deps; call via setTimeout to avoid setState-in-setState
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setTimeout(() => handleSessionEnd(), 0);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, handleSessionEnd]);

  // FIX 4: indexOf always returns the FIRST match — find the nearest upcoming index instead
  function switchMode(newMode: Mode) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    blinkLoopRef.current?.stop();
    blinkAnim.setValue(1);
    setRunning(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode].duration);

    const currentIdx = modeIdxRef.current;
    let nextIdx = -1;
    for (let i = 1; i <= MODE_ORDER.length; i++) {
      const candidate = (currentIdx + i) % MODE_ORDER.length;
      if (MODE_ORDER[candidate] === newMode) {
        nextIdx = candidate;
        break;
      }
    }
    modeIdxRef.current = nextIdx !== -1 ? nextIdx : MODE_ORDER.indexOf(newMode);
    animateModeChange();
  }

  function togglePlay() {
    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.9, duration: 80, useNativeDriver: true }),
      Animated.spring(btnScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    setRunning((r) => !r);
  }

  function skipSession() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    handleSessionEnd();
  }

  function resetTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    blinkLoopRef.current?.stop();
    blinkAnim.setValue(1);
    setRunning(false);
    setTimeLeft(cfg.duration);
  }

  const progress = 1 - timeLeft / cfg.duration;
  const isBlinking = timeLeft <= 10 && running;

  // FIX 5: Fallback font instead of returning null (blank screen)
  const timerFont = fontsLoaded ? "Oswald-Black" : "System";

  return (
    <Animated.View style={{ flex: 1, backgroundColor: cfg.bg, opacity: bgFade }}>
      <StatusBar barStyle={cfg.statusBar} backgroundColor={cfg.bg} />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 32,
            paddingBottom: 16,
            paddingTop: 8,
          }}
        >
          {/* ── Top: progress bar + session count ── */}
          <View style={{ width: "100%", gap: 10 }}>
            <View
              style={{
                backgroundColor: cfg.btnBg,
                width: "100%",
                height: 6,
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: `${progress * 100}%`,
                  backgroundColor: cfg.activeBtnBg,
                  height: "100%",
                  borderRadius: 99,
                }}
              />
            </View>

            <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ color: cfg.subText, fontSize: 13, fontWeight: "600", opacity: 0.6 }}>
                Session {session}
              </Text>
            </View>
          </View>

          {/* ── Centre: badge + digits + controls ── */}
          <View style={{ width: "100%", alignItems: "center", gap: 20, marginBottom: 20 }}>
            {/* Badge */}
            <Animated.View style={{ transform: [{ scale: badgeScale }] }}>
              <Image
                source={BADGE_IMAGES[mode]}
                style={{ height: 40, width: 180 }}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Timer digits */}
            <View style={{ alignItems: "center", width: "100%" }}>
              <Animated.Text
                style={{
                  fontFamily: timerFont,
                  color: cfg.text,
                  fontSize: 190,
                  lineHeight: 200,
                  letterSpacing: -4,
                  width: "100%",
                  textAlign: "center",
                  opacity: isBlinking ? blinkAnim : 1,
                }}
              >
                {pad(minutes)}
              </Animated.Text>

              <Animated.Text
                style={{
                  fontFamily: timerFont,
                  color: cfg.subText,
                  fontSize: 190,
                  lineHeight: 200,
                  letterSpacing: -4,
                  width: "100%",
                  textAlign: "center",
                  opacity: isBlinking ? blinkAnim : 1,
                }}
              >
                {pad(seconds)}
              </Animated.Text>
            </View>

            {/* Controls */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              {/* Reset */}
              <TouchableOpacity
                onPress={resetTimer}
                activeOpacity={0.7}
                style={{
                  backgroundColor: cfg.btnBg,
                  width: 64,
                  height: 56,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: cfg.text, fontSize: 20 }}>···</Text>
              </TouchableOpacity>

              {/* Play / Pause */}
              <Animated.View style={{ transform: [{ scale: btnScale }] }}>
                <TouchableOpacity
                  onPress={togglePlay}
                  activeOpacity={0.85}
                  style={{
                    backgroundColor: cfg.activeBtnBg,
                    width: 96,
                    height: 64,
                    borderRadius: 24,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: cfg.text, fontSize: 24, fontWeight: "bold" }}>
                    {running ? "⏸" : "▶"}
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Skip */}
              <TouchableOpacity
                onPress={skipSession}
                activeOpacity={0.7}
                style={{
                  backgroundColor: cfg.btnBg,
                  width: 64,
                  height: 56,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: cfg.text, fontSize: 20 }}>⏭</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Mode switcher tabs ── */}
          <View style={{ flexDirection: "row", gap: 8 }}>
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