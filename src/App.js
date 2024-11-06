import './App.css';
import NotificationBar from './NotificationBar';
import TaskContainer from './TaskContainer';
import ProjectsLists from './ProjectLists';
import DraftsSidebar from './DraftsSideBar';
import { useState, useEffect, useMemo } from 'react';

function App() {
  const [drafts, setDrafts] = useState([]);
  const [isDraftSidebarOpen, setIsDraftSidebarOpen] = useState(false);

  // Projects data
  const projects = useMemo(() => [
    {
      id: 1,
      name: 'Project A',
      description: 'A project focused on developing a user-friendly e-commerce platform.',
      tasks: [
        { id: 1, title: 'Task A1', description: 'Design homepage layout.' },
        { id: 2, title: 'Task A2', description: 'Implement search functionality.' }
      ]
    },
    {
      id: 2,
      name: 'Project B',
      description: 'An internal project for building a project management tool.',
      tasks: [
        { id: 3, title: 'Task B1', description: 'Set up database schema.' }
      ]
    },
    {
      id: 3,
      name: 'Project C',
      description: 'A mobile application for real-time weather updates.',
      tasks: []
    }
  ], []);

  const [selectedProject, setSelectedProject] = useState(projects[0]);

  // Fetch saved drafts from localStorage when the component mounts
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    setDrafts(savedDrafts); // Set drafts only if they exist
  }, []);

  // Save drafts to localStorage whenever the drafts state updates
  useEffect(() => {
    if (drafts.length > 0) {
      localStorage.setItem('drafts', JSON.stringify(drafts));
    }
  }, [drafts]);

  // Handle project selection change
  const changeSelectedProject = (selectedId) => {
    const newSelectedProject = projects.find(project => project.id === selectedId);
    setSelectedProject(newSelectedProject);
  };

  // Toggle the drafts sidebar visibility
  const handleToggleDraftSidebar = () => {
    setIsDraftSidebarOpen(prev => !prev);
  };

  const openDraftSidebar = () => {
    setIsDraftSidebarOpen(true);
  };

  // Handle deleting a draft
  const handleDeleteDraft = (draftId) => {
    setDrafts(prevDrafts => prevDrafts.filter(draft => draft.id !== draftId));
  };

  // Handle saving a draft
  const handleSaveDraft = (draftId) => {
    // Logic for saving draft (e.g., move draft to tasks list)
    // You can move it to a task within the selected project
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Welcome to TODO list</h1>
      </header>

      <NotificationBar 
        openDraftSideBar={openDraftSidebar} 
        isVisible={drafts.length > 0} 
      />

      <section className="main-section">
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
          onDeleteDraft={handleDeleteDraft}
          onSaveDraft={handleSaveDraft}
        />
      </section>
    </div>
  );
}

export default App;
