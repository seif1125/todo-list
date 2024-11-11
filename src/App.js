import './App.css';
import { useState, useEffect, createContext } from 'react';
import NotificationBar from './NotificationBar';
import TaskContainer from './TaskContainer';
import ProjectsLists from './ProjectLists';
import DraftsSidebar from './DraftsSideBar';

// Create Contexts
export const ProjectContext = createContext();

function App() {
  // State for managing drafts, projects, and selected project
  const [drafts, setDrafts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isDraftSidebarOpen, setIsDraftSidebarOpen] = useState(false);

  // Effect to load drafts from localStorage on page load
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    const savedProjects=JSON.parse(localStorage.getItem('projects')) || [];
    setDrafts(savedDrafts);
    setProjects(savedProjects)
  }, []);

  // Effect to save drafts to localStorage whenever drafts change
  useEffect(() => {
    if (drafts.length > 0) {
      localStorage.setItem('drafts', JSON.stringify(drafts));
    }
  }, [drafts]);

  // Effect to save projects to drafts on page reload
  useEffect(() => {
    const saveProjectsToDrafts = () => {
      localStorage.setItem('projects', JSON.stringify(projects));
    };
    window.addEventListener('beforeunload', saveProjectsToDrafts);
    return () => {
      window.removeEventListener('beforeunload', saveProjectsToDrafts);
    };
  }, [projects]);

  // Function to change selected project
  const changeSelectedProject = (selectedId) => {
    const newSelectedProject = projects.find(project => project.id === selectedId);
    setSelectedProject(newSelectedProject);
  };

  // Function to toggle drafts sidebar visibility
  const handleToggleDraftSidebar = () => {
    setIsDraftSidebarOpen((prev) => !prev);
  };

  // Function to handle adding drafts
  const handleAddDraft = (draft) => {
    setDrafts((prev) => [...prev, draft]);
  };

  // Function to handle adding a new project
  const handleAddProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  // Function to handle adding a new task to a selected project
  const handleAddTask = (newTask) => {
    const updatedProjects = projects.map((project) =>
      project.id === selectedProject.id
        ? { ...project, tasks: [...project.tasks, newTask] }
        : project
    );

    const updatedSelectedProject = updatedProjects.find(
      (project) => project.id === selectedProject.id
    );

    setProjects(updatedProjects);
    setSelectedProject(updatedSelectedProject);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Welcome to TODO list</h1>
      </header>

      <NotificationBar
        openDraftSideBar={handleToggleDraftSidebar}
        drafts={drafts}
      />

      <section className="main-section">
        <ProjectContext.Provider value={{ handleAddProject, handleAddTask, handleAddDraft }}>
          <TaskContainer selectedProject={selectedProject} />
          <ProjectsLists
            projects={projects}
            selectedProject={selectedProject}
            onProjectSelect={changeSelectedProject}
          />
        </ProjectContext.Provider>
        <DraftsSidebar
          drafts={drafts}
          isOpen={isDraftSidebarOpen}
          onClose={handleToggleDraftSidebar}
        />
      </section>
    </div>
  );
}

// Initial state for projects
// const getInitialProjects = () => [
//   {
//     id: 1,
//     name: 'Project A',
//     description: 'A project focused on developing a user-friendly e-commerce platform.',
//     tasks: [
//       { id: 1, title: 'Task A1', description: 'Design homepage layout.' },
//       { id: 2, title: 'Task A2', description: 'Implement search functionality.' }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Project B',
//     description: 'An internal project for building a project management tool.',
//     tasks: [
//       { id: 3, title: 'Task B1', description: 'Set up database schema.' }
//     ]
//   },
//   {
//     id: 3,
//     name: 'Project C',
//     description: 'A mobile application for real-time weather updates.',
//     tasks: []
//   }
// ];

export default App;
