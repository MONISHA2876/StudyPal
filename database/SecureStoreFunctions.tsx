import { Task } from "@/constants/types";
import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  }
  return null;
}

async function saveTask(value: Task) {
  await getValueFor("Tasks").then((res) => {
    let tasks: Task[];

    if (res) {
      tasks = JSON.parse(res);
      const taskIndex = tasks.findIndex((task) => task.id === value.id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = value;
      } else {
        tasks.push(value);
      }
    } else {
      tasks = [value];
    }

    save("Tasks", JSON.stringify(tasks));
  });
}

async function taskEdit(id: number, value: any | any[], choice: number) {
  getValueFor("Tasks").then((res) => {
    if (res) {
      let tasks: Task[] = JSON.parse(res);
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        switch (choice) {
          case 1:
            tasks[taskIndex].title = value;
            break;
          case 2:
            tasks[taskIndex].postponedTo = value;
            break;
          case 3:
            tasks[taskIndex].emoji = value;
            break;
          case 4:
            tasks[taskIndex].color = value;
            break;
          case 5:
            tasks[taskIndex].duration = value;
            break;
          case 6:
            tasks[taskIndex].timeSlot = value;
            break;
          case 7:
            tasks[taskIndex].Categories = value;
            break;
          case 8:
            tasks[taskIndex].Reminders = value;
            break;
          case 9:
            tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
            break;
          default:
            break;
        }
        save("Tasks", JSON.stringify(tasks));
      }
    }
  });
}

async function getTask(id: number) {
  const res = await getValueFor("Tasks");

  if (!res) return;

  const tasks: Task[] = JSON.parse(res);
  const taskIndex = tasks.findIndex((task) => task.id === id);
  const task: Task = tasks[taskIndex];
  return task;
}

async function deleteTask(id: number) {
  const res = await getValueFor("Tasks");

  if (!res) return;

  const tasks: Task[] = JSON.parse(res);
  const filteredTask = tasks.filter((task) => task.id !== id);

  await save("Tasks", JSON.stringify(filteredTask));
}

// "Tasks" key is containing an array of all the tasks in the app.

//Notes features

async function saveNote(value: any) {
  await getValueFor("Notes").then((res) => {
    let notes: any[];
    if (res) {
      notes = JSON.parse(res);
      notes.push(value);
    } else {
      notes = [value];
    }

    save("Notes", JSON.stringify(notes));
  });
}

async function getNote(id: number) {
  const res = await getValueFor("Notes");
  if (!res) return;
  const notes = JSON.parse(res);
  const noteIndex = notes.findIndex((note: any) => note.id === id);
  const note = notes[noteIndex];
  return note;
}

export {
  deleteTask, getNote, getTask, getValueFor,
  save,
  saveNote,
  saveTask,
  taskEdit
};

