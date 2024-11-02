
import './App.css';
import NotificationBar from './NotificationBar';
import TaskContainer from './TaskContainer';
import ProjectsLists from './ProjectLists'
import { useCallback, useMemo, useState } from 'react';



function App() {
  const projects = useMemo(()=>[
    { id: 1, name: 'Project A', tasks: [{ id: 1, title: 'Task A1' }, { id: 2, title: 'Task A2' }] },
    { id: 2, name: 'Project B', tasks: [{ id: 3, title: 'Task B1' }] },
    { id: 3, name: 'Project C', tasks: [] },
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
