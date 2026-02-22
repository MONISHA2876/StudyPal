interface Task {
  id: number;
  title: string;
  createdAt: string;
  postponedTo: string | null;
  emoji: string;
  color: string;
  duration: number | null;
  timeSlot: string | null;
  Categories: string[] | null;
  Reminders: string[] | null;
  isCompleted: boolean;
}

type CalendarDate = {
  id: string;
  day: string;
  date: number;
  isToday: boolean;
  fullDate: Date;
};

type DurationOption = {
  label: string;
  value: number;
};

export type { CalendarDate, DurationOption, Task };

