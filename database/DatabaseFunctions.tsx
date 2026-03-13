import { Router } from "expo-router";

async function handleEdit(id: number, router: Router) {
  router.push(`/AddTask?taskId=${id}`);
}

export { handleEdit };