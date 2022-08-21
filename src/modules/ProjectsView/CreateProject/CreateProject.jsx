import React, { useState } from "react";
import { toast } from "react-toastify";
import projectService from "../../../core/services/projectService";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ButtonCustom from "../../../base/ButtonCustom/ButtonCustom";
import ToastContainerCustom from "../../../base/ToastContainer";

export default function CreateProject({ addProject }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = (messagem, type) => toast(messagem, { type: type });

  const handleCreateProject = async () => {
    setLoading(true);
    try {
      const response = await projectService.createProject(title);
      addProject((project) => [...project, response.data]);
      notify("Project created successfully", "success");
      setTitle("");
    } catch (error) {
      notify(error.response.data.message, "error");
    }
    setLoading(false);
  };
  const handleKeyEnter = (e) => {
    return e.key === "Enter";
  };
  
  return (
    <div className="card bg-light">
      <div className="card-body mx-auto my-5 min-vw-80%">
        <div className="d-flex flex-column">
          <Typography variant="h6" gutterBottom>
            Create New Project
          </Typography>
          <TextField
            id="filled-basic"
            label="Project Name"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              handleKeyEnter(e) && handleCreateProject();
            }}
          />
          <ButtonCustom
            style={{ marginTop: "10px" }}
            onClick={handleCreateProject}
            variant="contained"
            loading={loading}
            text="Create new Project"
          />
        </div>
      </div>
      <ToastContainerCustom />
    </div>
  );
}
