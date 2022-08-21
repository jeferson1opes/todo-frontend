import { useState, useEffect } from "react";

import projectService from "../../core/services/projectService";
import CreateProject from "./CreateProject/CreateProject";
import Project from "./ProjectCard/ProjectCard";
import "./styles.css";

export default function ProjectsView() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getProjects();
    return () => {
      setProjects([]);
    };
  }, []);

  return (
    <div className="container">
      <div className="container-items">
        {projects.length
          ? projects.map((project) => (
              <div className="project-items" key={project.id}>
                <Project data={project} setProjects={setProjects} />
              </div>
            ))
          : null}
      </div>
      <div>
        <div className="create-project">
          <CreateProject addProject={setProjects} />
        </div>
      </div>
    </div>
  );
}
