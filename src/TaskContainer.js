
import AddTask from "./AddTask"
import TaskList from "./TasksList"


export default function TasksContainer ({selectedProject}){

  

    
      const completeTask = (taskId) => {
        // setTasks(
        //   tasks.map((task) =>
        //     task.id === taskId ? { ...task, completed: !task.completed } : task
        //   )
        // );
      };
    
      const deleteTask = (taskId) => {
        // setTasks(tasks.filter((task) => task.id !== taskId));
      };
    
    return(
        
        <div className="container">
        <TaskList  tasks={selectedProject?.tasks} onComplete={completeTask} onDelete={deleteTask}   />
        <AddTask selectedProject={selectedProject}/>
           

        </div>
    )

}