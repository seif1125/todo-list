import { useState } from "react"

export default function AddTask(){
 const[taskTitle,setTaskTitle]=useState('');
 const[taskDescription,setTaskDescription]=useState('ss');
return(
    <form className="add-task-form" onSubmit={()=>{return}}>
      <input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add new task"
        type="text"
        maxLength={25}
      />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Add task description"
        rows="4"
      ></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
}