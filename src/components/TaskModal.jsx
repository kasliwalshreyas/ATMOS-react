import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import React, { useState } from 'react';

const TaskModal = (props) => {

    const taskInfo = props.taskInfo
    let rerender = props.rerender
    const [taskName, setTaskName] = useState(taskInfo.taskName)
    const [taskCompletion, setTaskCompletion] = useState(taskInfo.taskCompletion)
    const [taskAssignee, settaskAssignee] = useState(taskInfo.taskAssignee)
    const [taskPriority, setTaskPriority] = useState(taskInfo.taskPriority)
    const [taskStatus, setTaskStatus] = useState(taskInfo.taskStatus)
    const [taskDeadline, setTaskDeadline] = useState(taskInfo.taskDeadline)

    // console.log(taskInfo);


    const handleSubmit = (taskId) => {
        let data = {taskName,taskCompletion,taskAssignee,taskPriority,taskStatus,taskDeadline}
        // console.log(data)
        if(taskId == null){
            console.log('Need to Add Task');
            fetch('http://localhost:8000/taskList', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then((res) => {return res.json()})
            .then((response) => {
                console.log(response);
                console.log("Task Added");
                // props.refreshTaskList()
            })
            .then(()=> props.setRerender(!rerender))
            .catch(err => {
                console.log(err.message)
            });
        }
        else{
            console.log('Need To Update Task');
            fetch(`http://localhost:8000/taskList/${taskId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then((res) => {return res.json()})
            .then((response) => {
                console.log(response);
                console.log("Task Updated");
                // props.refreshTaskList()
            })
            .then(()=> props.setRerender(!rerender))
            .catch(err => {
                console.log(err.message)
            });
        }

        props.closeModal()
    }

    return ( 
        <div>
            <Modal  show={props.show} onHide={props.closeModal} >
                {/* {console.log(props.show)} */}
                <Modal.Header closeButton>
                    <Modal.Title className='task-path-text'>ATMOS/Dashboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className='task-model-table'>
                        <tbody>
                        <tr className='task-modal-table-row'>
                            <td className='task-modal-table-data'>Task</td>
                            <td className='task-modal-table-data'>
                                <input type="text" placeholder='Enter Task' value = {taskName} onChange={(e)=>setTaskName(e.target.value)}></input>
                            </td>
                        </tr>
                        <tr className='task-modal-table-row'>
                            <td className='task-modal-table-data'>Completed</td>
                            <td className='task-modal-table-data'>
                                <select value={taskCompletion ? "completed":"incompleted"} onChange={(e)=>{if(e.target.value==="completed"){setTaskCompletion(true)}else{setTaskCompletion(false)}}}>
                                    <option value="completed">Yes</option>
                                    <option value="incompleted">No</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='task-modal-table-row'>
                            <td className='task-modal-table-data'>Assignee</td>
                            <td className='task-modal-table-data'>
                                <input type="text" placeholder='Enter Assignee' value={taskAssignee} onChange={(e)=>settaskAssignee(e.target.value)}></input>
                            </td>
                        </tr>
                        <tr className='task-modal-table-row'>
                            <td className='task-modal-table-data'>Priority</td>
                            <td className='task-modal-table-data'>
                                <select value={taskPriority} onChange={(e)=>setTaskPriority(e.target.value)}>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='task-modal-table-row'>
                            <td className='task-modal-table-data'>Status</td>
                            <td className='task-modal-table-data'>
                                <select value={taskStatus} onChange={(e)=>setTaskStatus(e.target.value)}>
                                    <option value="on-track">On Track</option>
                                    <option value="off-track">Off Track</option>
                                    <option value="at-risk">At Risk</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='task-modal-table-row'>
                            <td className='task-modal-table-data'>Deadline</td>
                            <td className='task-modal-table-data'>
                                <input type="date" value={taskDeadline} onChange={(e)=>setTaskDeadline(e.target.value)}></input>   
                            </td>
                        </tr>
                        </tbody>
        
                    </table>
                    <Nav className="task-modal-nav-bar" as="ul" defaultActiveKey="/desc">
                        <Nav.Item as="li">
                            <Nav.Link className="active-nav-option task-modal-nav-option task-modal-option-1" >Description</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link className="task-modal-nav-option task-modal-option-2">Comments</Nav.Link>
                        </Nav.Item>
                    </Nav>     
                    <hr className='task-modal-line-below-nav'></hr>     
                    <div>
                        <textarea className='task-modal-description' rows={5} placeholder="describe your task for your team members" ></textarea>
                    </div>
                    

                    {/* To Do: Make description active */}  
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={()=>{
                    // console.log(taskInfo) 
                    // console.log(props.taskInfo)
                    handleSubmit(taskInfo.id)}}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
 
export default TaskModal;