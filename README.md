<div align="center">

# 📚 StudyPal

**Your personal study companion — built for students who mean business.**

StudyPal helps you organize daily tasks, beat procrastination with Pomodoro timers, track your progress with stats, and build better study habits — one focused session at a time.

[![React Native](https://img.shields.io/badge/React%20Native-0.79-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2053-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-82.5%25-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://www.nativewind.dev/)

</div>

---

## ✨ Features

- **📋 Task Management** — Add, organize, and track your daily study tasks from a clean dashboard
- **📅 Schedule View** — See your study sessions laid out by day so nothing slips through
- **⏱ Pomodoro Timer** — Built-in focus timer to help you work in productive sprints and beat procrastination
- **📊 Stats & Insights** — Visualize your study habits and track consistency over time
- **📝 Notes** — Capture quick thoughts, summaries, or anything you don't want to forget
- **🎨 Custom Tab Bar** — Floating action button with a smooth, modern bottom navigation UI
- **📱 Cross-platform** — Runs on Android and iOS from a single codebase

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) |
| Language | TypeScript |
| Routing | [Expo Router](https://expo.github.io/router/) (file-based) |
| Styling | [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for RN) |
| Bundler | Metro |
| Linting | ESLint |

---

## 📁 Project Structure

```
StudyPal/
├── app/                    # File-based routes (Expo Router)
│   ├── _layout.tsx         # Root layout with custom tab bar
│   ├── index.tsx           # Home / dashboard screen
│   ├── schedule.tsx        # Daily schedule screen
│   ├── AddTask.tsx         # Add new task screen (FAB route)
│   ├── stats.tsx           # Study stats & analytics screen
│   └── notes.tsx           # Notes screen
├── components/
│   └── TabBar.tsx          # Custom floating tab bar component
├── assets/
│   └── icons/              # App icon assets (home, calendar, stats, edit)
├── app.json                # Expo app configuration
├── tailwind.config.js      # Tailwind / NativeWind configuration
├── babel.config.js         # Babel configuration
├── metro.config.js         # Metro bundler configuration
├── tsconfig.json           # TypeScript configuration
└── nativewind-env.d.ts     # NativeWind type declarations
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your phone, **or** an Android/iOS emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MONISHA2876/StudyPal.git
   cd StudyPal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run the app**

   Scan the QR code with **Expo Go** (Android) or your Camera app (iOS), or press:
   - `a` — open on Android emulator
   - `i` — open on iOS simulator

---

## 📱 Screens

| Screen | Route | Description |
|---|---|---|
| Home | `/` | Dashboard with today's tasks and quick overview |
| Schedule | `/schedule` | Calendar-style daily schedule view |
| Add Task | `/AddTask` | Form to create a new study task (opened via FAB) |
| Stats | `/stats` | Study session analytics and habit tracking |
| Notes | `/notes` | Freeform notes and quick captures |

---

## 🎨 UI Design

StudyPal features a custom floating tab bar with:

- A **red floating action button (+)** that opens the Add Task screen
- **Purple active state** tinting for selected tab icons
- A **card-style bottom nav** with rounded corners and a soft shadow
- Smooth `activeOpacity` press feedback on all interactive elements

---

<div align="center">

Made with ❤️ by [Monisha](https://github.com/MONISHA2876)

</div>
