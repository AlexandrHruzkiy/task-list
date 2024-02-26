import { useState, useEffect } from "react";
import List from "./components/List";
import {v4 as uuidv4} from 'uuid';

function Main(){

    const [tasks, setTasks] = useState(()=>{
        const storedTodos = localStorage.getItem('tasks');
        if(!storedTodos){
            return []
        } else{
            return JSON.parse(storedTodos);
        }
    });
        
        const countUnfinishedTasks = () => {
         const storedTodos = JSON.parse(localStorage.getItem('tasks'));
         if (!storedTodos) return 0;
         return storedTodos.filter(task => !task.status).length;
     };
    
    const [tasksTitle, setTasksTitle]=useState('');
    const [unfinishedTasksCount, setUnfinishedTasksCount] = useState(0)

    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks));
        setUnfinishedTasksCount(countUnfinishedTasks())
        const intervalId = setInterval(() => {
            setUnfinishedTasksCount(countUnfinishedTasks());
        }, 100);
        return () => clearInterval(intervalId);
    },[tasks])

    const addTask = (e) =>{
        const storedTodos = JSON.parse(localStorage.getItem('tasks'))
        if(e.key === 'Enter' && e.target.value !==''){
            setTasks([
                ...storedTodos, {
                    id: uuidv4(),
                    title: tasksTitle,
                    status: false
                }
            ]);
            setTasksTitle('');
        }
    }


    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return(
        <>
         <div className="container">
            <h1>Note your tasks</h1>
            <span>{month + ' ' + day + ', '+ year}</span>
            <p>Unfinished tasks: {unfinishedTasksCount}</p>
            <div className="input-filed">
                <input type="text" 
                    value={tasksTitle}
                    onChange={event => setTasksTitle(event.target.value) }
                    onKeyDown={addTask}

                />
                <label>Task name</label>
            </div>
            <div>
        </div>
            <List tasks={tasks} />
         </div>   
        </>
    );
}

export default Main;