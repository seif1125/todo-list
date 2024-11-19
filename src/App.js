import "./App.css";
import { useState, useEffect } from "react";
import NotificationBar from "./components/NotificationBar";
import TaskContainer from "./components/TaskContainer";
import ProjectsLists from "./components/ProjectLists";
import DraftsSidebar from './components/DraftsSideBar';
import { ProjectContext } from "./contexts/ProjectContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useProjectManager } from "./hooks/useProjectManager";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [drafts, setDrafts] = useLocalStorage("drafts", []);
  const [projects, setProjects] = useLocalStorage("projects", []);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDraftSidebarOpen, setIsDraftSidebarOpen] = useState(false);

  const debouncedDrafts = useDebounce(drafts, 500);
  const debouncedProjects = useDebounce(projects, 500);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(debouncedDrafts));
  }, [debouncedDrafts]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(debouncedProjects));
  }, [debouncedProjects]);

  useEffect(() => {
    const saveProjectsOnUnload = () => {
      localStorage.setItem("projects", JSON.stringify(projects));
    };
    window.addEventListener("beforeunload", saveProjectsOnUnload);
    return () => window.removeEventListener("beforeunload", saveProjectsOnUnload);
  }, [projects]);

  const {
    addProject,
    editProject,
    deleteProject,
    addTask,
    editTask,
    deleteTask,
    addDraft,
    deleteDraft,
    saveDraft
  } = useProjectManager(projects, setProjects, selectedProject, setSelectedProject,drafts,setDrafts);



  const toggleDraftSidebar = () => setIsDraftSidebarOpen(!isDraftSidebarOpen);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Welcome to TODO List</h1>
      </header>

      <NotificationBar
        openDraftSideBar={toggleDraftSidebar}
        drafts={drafts}
      />

      <section className="main-section">
        <ProjectContext.Provider
          value={{
            addProject,
            editProject,
            deleteProject,
            addTask,
            editTask,
            deleteTask,
            addDraft,
            deleteDraft,
            saveDraft,
          }}
        >
          <TaskContainer projects={projects} selectedProject={selectedProject} />
          <ProjectsLists
            projects={projects}
            selectedProject={selectedProject}
            onProjectSelect={(id) =>
              setSelectedProject(projects.find((project) => project.id === id))
            }
          />
          <DraftsSidebar
            drafts={drafts}
            isOpen={isDraftSidebarOpen}
            onClose={toggleDraftSidebar}
            projects={projects}
          />
        </ProjectContext.Provider>
      </section>
    </div>
  );
}

export default App;
