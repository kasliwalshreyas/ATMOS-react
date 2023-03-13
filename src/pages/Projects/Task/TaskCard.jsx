import React from "react";
import { Draggable } from "react-beautiful-dnd";
const TaskCard = ({ task, section, expandModal, rerender, setRerender }) => {
    // console.log(task, 'task');

    const dateFormater = (date) => {
        let newDate = new Date(date);
        const offset = newDate.getTimezoneOffset()
        newDate = new Date(newDate.getTime() - (offset * 60 * 1000))
        return newDate.toISOString().split('T')[0]
    }

    const deleteTask = async (event, taskID) => {
        event.stopPropagation();

        const res = await fetch(`http://localhost:4000/task/deleteTask/${taskID}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'auth-token': `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("deleted task", taskID);
        setRerender(!rerender);
    }

    // console.log(task)

    return (
        <Draggable draggableId={task._id} index={task._id}>
            {(provided) => (
                <div className="task task-0"
                    variant="primary"
                    onClick={() => expandModal(task, section)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={task.id}>
                    <div className="task-head">
                        <input type="checkbox" className="task-checker-input" checked={task.taskCompletion} readOnly />
                        <input type="text" className="task-name-input" placeholder="Task Name" value={task.taskName ? task.taskName : ""} readOnly />
                    </div>
                    <div className="task-info">
                        {task.taskPriority && (task.taskPriority !== "Choose Priority") && <p className="priority-tag">{task.taskPriority}</p>}
                        {task.taskStatus && (task.taskStatus !== "Choose Status") && <p className="status-tag">{task.taskStatus}</p>}
                    </div>
                    <div className="task-timeline">
                        <div className="deadine">
                            {task.taskDeadline && <p className="date">{dateFormater(task.taskDeadline)}</p>}
                        </div>
                        <div className="delete-btn-div" onClick={event => { deleteTask(event, task._id) }}>
                            <img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/000000/external-delete-ecommerce-user-interface-inkubators-glyph-inkubators.png" />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;