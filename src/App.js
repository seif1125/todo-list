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
  const [selectedProject, setSelectedProject] = useState({});
  const [isDraftSidebarOpen, setIsDraftSidebarOpen] = useState(false);

  // Effect to load drafts from localStorage on page load
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    const savedProjects=JSON.parse(localStorage.getItem('projects')) || [];
    setDrafts(savedDrafts);
    setProjects(savedProjects)
    if(savedProjects.length>0){setSelectedProject(savedProjects[0])}
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

  const handleEditTask = (updatedTask) => {
    const updatedProjects = projects.map((project) =>
      project.id === selectedProject.id
        ? {
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            ),
          }
        : project
    );
  
    const updatedSelectedProject = updatedProjects.find(
      (project) => project.id === selectedProject.id
    );
  
    setProjects(updatedProjects);
    setSelectedProject(updatedSelectedProject);
  };
  const handleDeleteTask= (taskId)=>{
    
      const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id
          ? { ...project, tasks: project.tasks.filter((task) => task.id !== taskId) }
          : project
      );
  
      const updatedSelectedProject = updatedProjects.find(
        (project) => project.id === selectedProject.id
      );
  
      setProjects(updatedProjects);
      setSelectedProject(updatedSelectedProject);
    };

    const handleDeleteProject = (projectId)=>{
       const updatedProjects=projects.filter(project=>{return project.id!==projectId})
       const updatedSelectedProject = updatedProjects.find(
        (project) => project.id === selectedProject.id
      );
      setProjects(updatedProjects);
      setSelectedProject(updatedSelectedProject);

    }

    const handleEditProject=(updatedProject)=>{
      const updatedProjects=projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    )
    const updatedSelectedProject = updatedProjects.find(
      (project) => project.id === selectedProject.id
    );
    setProjects(updatedProjects);
      setSelectedProject(updatedSelectedProject);
    }

    const handleSaveDraft = (draftId) => {
      setProjects((prevProjects) => {
        return drafts.reduce((updatedProjects, draft) => {
          if (draft.id === draftId) {
            // Check if project exists
            const projectIndex = updatedProjects.findIndex((proj) => proj.id === draft.projectId);
    
            if (projectIndex !== -1) {
              // Add draft to existing project's tasks
              const updatedProject = {
                ...updatedProjects[projectIndex],
                tasks: [
                  ...updatedProjects[projectIndex].tasks,
                  {
                    id: Date.now(), // Unique ID for the task
                    title: draft.title,
                    description: draft.description,
                    completed: false,
                  },
                ],
              };
    
              updatedProjects[projectIndex] = updatedProject;
            } else {
              // Create a new project and add the draft as the first task
              const newProject = {
                id: draft.projectId || Date.now(), // Use existing ID if available or generate one
                name: draft.projectName || "Untitled Project",
                description: "Auto-created project",
                tasks: [
                  {
                    id: Date.now(), // Unique ID for the task
                    title: draft.title,
                    description: draft.description,
                    completed: false,
                  },
                ],
              };
    
              updatedProjects.push(newProject);
            }
          }
    
          return updatedProjects;
        }, [...prevProjects]);
      });
    
      // Remove the draft from the drafts list
      setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.id !== draftId));
    };
    
    const handleDeleteDraft = (draftId) => {
      setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.id !== draftId));
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
        <ProjectContext.Provider value={{ handleAddProject, handleAddTask, handleAddDraft,handleEditTask,handleDeleteTask,handleEditProject,handleDeleteProject,handleSaveDraft,handleDeleteDraft}}>
          <TaskContainer selectedProject={selectedProject} />
          <ProjectsLists
            projects={projects}
            selectedProject={selectedProject}
            onProjectSelect={changeSelectedProject}
          />
        
        <DraftsSidebar
          drafts={drafts}
          isOpen={isDraftSidebarOpen}
          onClose={handleToggleDraftSidebar}
          projects={projects}
        />
        </ProjectContext.Provider>
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
