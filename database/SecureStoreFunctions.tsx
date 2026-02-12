import { Task } from "@/types/types";
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

export { getValueFor, save, taskEdit };

// "Tasks" key is containing an array of all the tasks in the app.

// {
//     id: 1,       =>     We can not edit this part
//     title: "Lunch with Mom",       =>     we can edit this part (1)
//     createdAt: new Date(),       =>     We can not edit this part
//     postponedTo: null,       =>     we can edit this part (2)
//     emoji: "🍲",       =>     we can edit this part (3)
//     color: "#ECE4D7",       =>     we can edit this part (4)
//     duration: 30,       =>     we can edit this part (5)
//     timeSlot: "13:30 - 14:00",       =>     we can edit this part (6)
//     Categories: ["Family", "Health"],       =>     we can edit this part (7)
//     Reminders: ["30 minutes before"],       =>     we can edit this part (8)
//     isCompleted: false,       =>     we can edit this part (9)
//   }
