interface Task {
  id: number;
  title: string;
  createdAt: Date;
  postponedTo: Date | null;
  emoji: string;
  color: string;
  duration: number | null;
  timeSlot: string | null;
  Categories: string[] | null;
  Reminders: string[] | null;
  isCompleted: boolean;
}

export type { Task };

