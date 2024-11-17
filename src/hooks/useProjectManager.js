export function useProjectManager(projects, setProjects, selectedProject, setSelectedProject,drafts,setDrafts) {
    const addProject = (newProject) => setProjects([...projects, newProject]);
    const editProject = (updatedProject) =>
      setProjects(projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)));
    const deleteProject = (projectId) => {
      const updatedProjects = projects.filter((project) => project.id !== projectId);
      setProjects(updatedProjects);
      setSelectedProject(updatedProjects[0] || null);
    };
  
    const addTask = (task) => {
      setProjects(
        projects.map((project) =>
          project.id === selectedProject.id
            ? { ...project, tasks: [...project.tasks, task] }
            : project
        )
      );
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
    };

    const addDraft = (draft) => setDrafts([...drafts, draft]);
    const deleteDraft = (draftId) => setDrafts(drafts.filter((draft) => draft.id !== draftId));
    const saveDraft = (draftId) => {
      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects];
        drafts.forEach((draft) => {
          if (draft.id === draftId) {
            const projectIndex = updatedProjects.findIndex((proj) => proj.id === draft.projectId);
            if (projectIndex !== -1) {
              updatedProjects[projectIndex].tasks.push({
                id: Date.now(),
                title: draft.title,
                description: draft.description,
                completed: false,
              });
            } else {
              updatedProjects.push({
                id: draft.projectId || Date.now(),
                name: draft.projectName || "Untitled Project",
                description: "Auto-created project",
                tasks: [
                  {
                    id: Date.now(),
                    title: draft.title,
                    description: draft.description,
                    completed: false,
                  },
                ],
              });
            }
          }
        });
        return updatedProjects;
      });
  
      deleteDraft(draftId);
    };
  
    return { addProject, editProject, deleteProject, addTask, editTask, deleteTask,addDraft,saveDraft,deleteDraft };
  }
  