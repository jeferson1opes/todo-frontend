import { useState } from "react";
import projectService from "../../../core/services/projectService";
import taskService from "../../../core/services/taskService";
import ButtonCustom from "../../../base/ButtonCustom/ButtonCustom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField, Typography } from "@mui/material";

import Task from "../../Task/Task";
import ToastContainerCustom from "../../../base/ToastContainer";

export default function Project({ data, setProjects }) {
  const [newTitle, setNewTitle] = useState(data.title);
  const [editTitleProject, setEditTitleProject] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState("");

  const tasksTodo = data.tasks.filter((task) => !task.completedAt);
  const completedTasks = data.tasks.filter((task) => task.completedAt);

  const notify = (messagem, type) => toast(messagem, { type: type });

  const handleChangeTitle = async () => {
    try {
      const response = await projectService.changeTitle(data.id, newTitle);
      setProjects((projects) =>
        projects.map((project) => {
          if (project.id === response.data.id) {
            project.title = response.data.title;
          }
          return project;
        })
      );
      setEditTitleProject(false);
    } catch (error) {
      notify("Error change title", "error");
    }
  };

  const handleDeleteProject = async () => {
    try {
      await projectService.deleteProject(data.id);
      setProjects((projects) =>
        projects.filter((project) => project.id !== data.id)
      );
    } catch (error) {
      notify("error deleting project", "error");
    }
  };

  const handleCancel = () => {
    setNewTitle(data.title);
    setEditTitleProject(false);
  };

  const handleCreateTask = async () => {
    setLoading(true);
    if (newTask) {
      const response = await taskService.createTask(data.id, newTask);
      setProjects((projects) =>
        projects.map((project) => {
          if (project.id === data.id) {
            project.tasks = [...project.tasks, response.data];
          }
          return project;
        })
      );
      setNewTask("");
    } else {
      notify("Description of the required task", "error");
    }
    setLoading(false);
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await taskService.markCompleted(taskId);
      setProjects((projects) =>
        projects.map((project) => {
          if (project.id === data.id) {
            project.tasks.map((task) => {
              if (task.id === taskId) {
                task.completedAt = response.data.completedAt;
              }
              return task;
            });
          }
          return project;
        })
      );
    } catch (error) {
      console.log("error completing task", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await taskService.deleteTask(taskId);
      console.log("delete task response", response);
      setProjects((projects) =>
        projects.map((project) => {
          if (project.id === data.id) {
            project.tasks = project.tasks.filter((task) => task.id !== taskId);
          }
          return project;
        })
      );
      console.log("deleting task", taskId);
    } catch (error) {
      console.log("error deleting task", error);
    }
  };

  const handleKeyEnter = (e) => {
    return e.key === "Enter";
  };

  return (
    <>
      <div className="card">
        <div className="card-header-custom">
          <input
            className="input-custom"
            value={newTitle}
            disabled={!editTitleProject}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              handleKeyEnter(e) && handleChangeTitle();
            }}
          />
          <div className="project-card-title-buttons">
            {editTitleProject ? (
              <>
                <IconButton
                  aria-label="Done"
                  onClick={handleChangeTitle}
                  size="small"
                  color="primary"
                >
                  <DoneIcon
                    fontSize="small"
                    aria-label="Change title project"
                  />
                </IconButton>
                <IconButton
                  aria-label="Close"
                  onClick={handleCancel}
                  size="small"
                  color="primary"
                >
                  <CloseIcon
                    fontSize="small"
                    aria-label="Cancel change title project"
                  />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  aria-label="delete"
                  onClick={() => setEditTitleProject(true)}
                  size="small"
                  color="primary"
                >
                  <EditIcon fontSize="small" aria-label="Edit title project" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={handleDeleteProject}
                  size="small"
                  color="primary"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </div>
        </div>
        <div className="card-body-custom">
          <Typography variant="h6">To Do</Typography>
          {tasksTodo?.map((task) => (
            <Task
              key={task.id}
              task={task}
              handleCompleteTask={handleCompleteTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}

          {completedTasks?.length > 0 && (
            <>
              <Typography variant="h6" className="title-done">
                Done
              </Typography>
              {completedTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </>
          )}

          <hr />
          <div className="add-task">
            <TextField
              required
              style={{ width: 270 }}
              id="filled-basic"
              label="Task"
              variant="outlined"
              margin="normal"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                handleKeyEnter(e) && handleCreateTask();
              }}
            />
            <div>
              <ButtonCustom
                onClick={handleCreateTask}
                color="success"
                variant="contained"
                loading={loading}
                aria-label="Add new task"
                text="Add"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainerCustom />
    </>
  );
}
