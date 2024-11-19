export function useProjectManager(
  projects,
  setProjects,
  selectedProject,
  setSelectedProject,
  drafts,
  setDrafts
) {
  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
    setSelectedProject(newProject); // Immediately update selected project
  };

  const editProject = (updatedProject) => {
    setProjects(projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    ));
    setSelectedProject(updatedProject); // Immediately update selected project
  };

  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
    setSelectedProject(updatedProjects[0] || null); // Select the first project after deletion
  };

  const addTask = (task) => {
    setProjects(
      projects.map((project) =>
        project.id === selectedProject.id
          ? { ...project, tasks: [...project.tasks, task] }
          : project
      )
    );
    setSelectedProject({
      ...selectedProject,
      tasks: [...selectedProject.tasks, task], // Immediately update selected project's tasks
    });
  };

  const editTask = (task) => {
    setProjects(
      projects.map((project) =>
        project.id === selectedProject.id
          ? {
              ...project,
              tasks: project.tasks.map((t) => (t.id === task.id ? task : t)),
            }
          : project
      )
    );
    setSelectedProject({
      ...selectedProject,
      tasks: selectedProject.tasks.map((t) => (t.id === task.id ? task : t)),
    });
  };

  const deleteTask = (taskId) => {
    setProjects(
      projects.map((project) =>
        project.id === selectedProject.id
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project
      )
    );
    setSelectedProject({
      ...selectedProject,
      tasks: selectedProject.tasks.filter((task) => task.id !== taskId),
    });
  };

  const addDraft = (draft) => {
    setDrafts([...drafts, draft]);
  };

  const deleteDraft = (draftId) => {
    setDrafts(drafts.filter((draft) => draft.id !== draftId));
  };

  const saveDraft = (draft) => {
    setProjects(
      projects.map((project) =>
        project.id === draft.projectId
          ? { ...project, tasks: [...project.tasks, {'title':draft.title,'id':draft.id,'description':draft.description}] }
          : project
      )
    );
    deleteDraft(draft.id)
    setSelectedProject((prevSelectedProject) => {
      if (prevSelectedProject?.id === draft.projectId) {
        return {
          ...prevSelectedProject,
          tasks: [
            ...prevSelectedProject.tasks,
            {
              title: draft.title,
              id: draft.id,
              description: draft.description,
              completed: false,
            },
          ],
        };
      }
      return prevSelectedProject; // No change if it's not the selected project
    });
  };
       return {
    addProject,
    editProject,
    deleteProject,
    addTask,
    editTask,
    deleteTask,
    addDraft,
    saveDraft,
    deleteDraft,
  };
  };
  



