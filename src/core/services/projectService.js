import client from "./client";

const createProject = (title) => {
  return client.post("/projects", { title });
};

const getProjects = () => {
  return client.get("/projects");
};

const changeTitle = (projectId, newTitle) => {
  return client.put(`projects/${projectId}`, { title: newTitle });
};

const deleteProject = (projectId) => {
  return client.delete(`projects/${projectId}`);
};

const projectService = {
  createProject,
  getProjects,
  changeTitle,
  deleteProject,
};

export default projectService;
