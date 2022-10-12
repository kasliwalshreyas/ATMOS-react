import { useState } from "react";

const TaskCard = (props) => {

    const task = props.task;
    const section = props.section;
    const rerender = props.rerender;
    // const setTaskCompletion = props.setTaskCompletion;
    // const [taskCompletion, setTaskCompletion] = useState(task.taskCompletion)
    // const [taskName, setTaskName] = useState(task.taskName)

    // console.log(task);


    const deleteTask = (event, taskID, sectionInfo) => {
        event.stopPropagation();

        const sectionName = sectionInfo.sectionName;
        const projectId = sectionInfo.projectId;
        const taskIDList = sectionInfo.taskIDList.filter((taskNumber)=>{return !(taskNumber === taskID)});        
        const sectionData = {sectionName,projectId,taskIDList};
        console.log(sectionData);

        fetch(`http://localhost:8000/taskList/${taskID}`, {
                method: 'DELETE'
        })
        .then(()=>{
            console.log('Task Deleted');
            fetch(`http://localhost:8000/sectionList/${sectionInfo.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(sectionData)
            })
            .then(()=> {
                console.log("Section TaskList Updated");
                props.setRerender(!rerender)
            });                 
        })
        .catch((err)=>{console.log(err.message);})

            
    }


    return ( 
        <div className="task task-0" variant="primary" onClick={() => props.expandModal(task, section)} key={task.id}>
            <div className="task-head">
                <input type="checkbox" className="task-checker-input" checked={task.taskCompletion} readOnly
                //  onChange={(e)=>{console.log(e.target.checked);}}
                 />
                <input type="text" className="task-name-input" placeholder="Task Name" value = {task.taskName?task.taskName:""} readOnly
                //  onChange={(e)=>setTaskName(e.target.value)} 
                 />
            </div>
            <div className="task-info">
                {task.taskPriority && (task.taskPriority !== "Choose Priority") && <p className="priority-tag">{task.taskPriority}</p>}
                {task.taskStatus && (task.taskStatus !== "Choose Status") && <p className="status-tag">{task.taskStatus}</p>}
            </div>
            <div className="task-timeline">
                <div className="deadine">
                    {task.taskDeadline && <p className="date">{task.taskDeadline}</p>}
                </div>
                <div className="delete-btn-div" onClick={event=>{deleteTask(event, task.id, section)}}>
                    <img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/000000/external-delete-ecommerce-user-interface-inkubators-glyph-inkubators.png"/>
                </div>
            </div>                                       
        </div>
     );
}
 
export default TaskCard;