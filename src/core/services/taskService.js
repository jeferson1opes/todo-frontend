import client from "./client";

const createTask = (projectId, description) => {
  return client.post("/tasks", { projectId, description });
};

const markCompleted = (taskId) => {
  return client.post("/tasks/complete", { taskId });
};

const deleteTask = (taskId) => {
  return client.delete("/tasks", { data: { taskId } });
};

const taskService = {
  createTask,
  markCompleted,
  deleteTask,
};

export default taskService;
