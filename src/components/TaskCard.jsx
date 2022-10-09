import { useState } from "react";

const TaskCard = (props) => {

    const task = props.task;
    // const setTaskCompletion = props.setTaskCompletion;
    // const [taskCompletion, setTaskCompletion] = useState(task.taskCompletion)
    // const [taskName, setTaskName] = useState(task.taskName)


    return ( 
        <div className="task task-0" variant="primary" onClick={() => props.expandModal(task)} key={task.id}>
            <div className="task-head">
                <input type="checkbox" className="task-checker-input" defaultChecked={task.taskCompletion}
                //  onChange={(e)=>{console.log(e.target.checked);}}
                 />
                <input type="text" className="task-name-input" placeholder="Task Name" value = {task.taskName}
                //  onChange={(e)=>setTaskName(e.target.value)} 
                 />
            </div>
            <div className="task-info">
                {task.taskPriority && <p className="priority-tag">{task.taskPriority}</p>}
                {task.taskStatus && <p className="status-tag">{task.taskStatus}</p>}
            </div>
            <div className="task-timeline">
                <div className="deadine">
                    {task.taskDeadline && <p className="date">{task.taskDeadline}</p>}
                </div>
            </div>                                       
        </div>
     );
}
 
export default TaskCard;