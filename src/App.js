
import './App.css';
import NotificationBar from './NotificationBar';
import TaskContainer from './TaskContainer';
import ProjectsLists from './ProjectLists'
import { useCallback, useMemo, useState } from 'react';



function App() {
  const projects = useMemo(()=> [
    {
      id: 1,
      name: 'Project A',
      description: 'A project focused on developing a user-friendly e-commerce platform.',
      tasks: [
        {
          id: 1,
          title: 'Task A1',
          description: 'Design the homepage layout and product catalog sections.'
        },
        {
          id: 2,
          title: 'Task A2',
          description: 'Implement search functionality and filter options for the product catalog.'
        }
      ]
    },
    {
      id: 2,
      name: 'Project B',
      description: 'An internal project for building a project management tool for team collaboration.',
      tasks: [
        {
          id: 3,
          title: 'Task B1',
          description: 'Set up the database schema and models for user data and projects.'
        }
      ]
    },
    {
      id: 3,
      name: 'Project C',
      description: 'A mobile application that offers real-time weather updates and alerts.',
      tasks: []
    }
  ],[]);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
 

 const changeSelectedProject=useCallback((selectedId)=>{
    const newSelectedProject = projects.find((project) => project.id === selectedId);
    
 setSelectedProject(()=>{return newSelectedProject});    
  },[projects])
  

  return (
    <div className="App">
         <header className='app-header'  >
          <h1>Welcome To TODO list</h1>
         </header>
         <NotificationBar message="You have drafted messages!" isVisible={true} />
         <section className='main-section'>
             <TaskContainer selectedProject={selectedProject}  />
             <ProjectsLists  projects={projects}
          selectedProject={selectedProject}
          onProjectSelect={changeSelectedProject} />
         </section>

       


       
    </div>
  );
}

export default App;
