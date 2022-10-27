import React from "react";
import { Draggable } from "react-beautiful-dnd";
const TaskCard = ({ task, section, expandModal, rerender, setRerender }) => {
    // console.log(task, 'task');

    const deleteTask = (event, taskID, sectionInfo) => {
        event.stopPropagation();

        const sectionName = sectionInfo.sectionName;
        const projectId = sectionInfo.projectId;
        const taskIDList = sectionInfo.taskIDList.filter((task) => { return !(task.id === taskID) });
        for (let i = 0; i < taskIDList.length; i++) {
            taskIDList[i] = taskIDList[i].id;
        }
        const sectionData = { sectionName, projectId, taskIDList };
        // console.log(sectionData);

        //delete task if task has an Assignee
        if (task.taskAssignee) {
            fetch(`http://localhost:8000/taskList/${taskID}`, {
                method: 'DELETE'
            })
                .then(() => {
                    console.log('Task Deleted');
                    fetch(`http://localhost:8000/sectionList/${sectionInfo.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(sectionData)
                    })
                        .then(() => {
                            console.log("Section TaskList Updated");
                            // setRerender(!rerender)
                        });
                })
                .then(() => {
                    fetch(`http://localhost:8000/userList/${task.taskAssignee}`)
                        .then((res) => { return res.json() })
                        .then((AssigneeData) => {
                            // const taskIDList = res2.taskIDList.filter((task) => { return !(task.id === taskID) });
                            // const userData = { ...res2, taskIDList };
                            console.log(taskID);
                            AssigneeData.taskAssignedIDList = AssigneeData.taskAssignedIDList.filter((taskid) => { return !(taskid === taskID) });
                            console.log(AssigneeData);
                            fetch(`http://localhost:8000/userList/${task.taskAssignee}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(AssigneeData)
                            })
                                .then(() => {
                                    console.log("User TaskList Updated");
                                    setRerender(!rerender)
                                });
                        }
                        )
                })
                .catch((err) => { console.log(err.message); })
        }
        //delete task if task has no Assignee
        else {
            fetch(`http://localhost:8000/taskList/${taskID}`, {
                method: 'DELETE'
            })
                .then(() => {
                    console.log('Task Deleted');
                    fetch(`http://localhost:8000/sectionList/${sectionInfo.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(sectionData)
                    })
                        .then(() => {
                            console.log("Section TaskList Updated");
                            setRerender(!rerender)
                        });
                })
                .catch((err) => { console.log(err.message); });
        }
    }

    // console.log(task)

    return (
        <Draggable draggableId={task.id.toString()} index={task.id}>
            {(provided) => (
                <div className="task task-0"
                    variant="primary"
                    onClick={() => expandModal(task, section)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={task.id}>
                    <div className="task-head">
                        <input type="checkbox" className="task-checker-input" checked={task.taskCompletion} readOnly
                        //  onChange={(e)=>{console.log(e.target.checked);}}
                        />
                        <input type="text" className="task-name-input" placeholder="Task Name" value={task.taskName ? task.taskName : ""} readOnly
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
                        <div className="delete-btn-div" onClick={event => { deleteTask(event, task.id, section) }}>
                            <img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/000000/external-delete-ecommerce-user-interface-inkubators-glyph-inkubators.png" />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;