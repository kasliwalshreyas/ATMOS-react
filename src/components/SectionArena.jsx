import React, { useState } from 'react';
import TaskModal from './TaskModal';
import TaskCard from './TaskCard';
import { useEffect } from 'react';


const SectionArena = () => {
    const [show, setShow] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const expandModal = (taskInfo) => {
        setSelectedTask(taskInfo);
        setShow(true);
    }

    const closeModal = () => {
        setSelectedTask(null);
        setShow(false); 
    }

    const [taskList, setTaskList] = useState(null)
    const [error, setError] = useState(null)
    const [rerender, setRerender] = useState(false);

    useEffect(()=> {
        fetch("http://localhost:8000/taskList")
            .then(res => {
                // console.log(res);
                if(!res.ok){
                    throw Error('Not able to fetch the TaskList');
                }
                return res.json();

            })
            .then(data => {
                setTaskList(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setTaskList(null);
            });
    }, [rerender]);

    
    function getDate(strFormatDate){
        // const strFormatDate = "08-10-2022";
        const dateFormatDate = new Date(strFormatDate)
        let day, month, date
        if (dateFormatDate.getMonth() < 9){
            month = "0"+(dateFormatDate.getMonth()+1)
        }
        else{
            month = dateFormatDate.getMonth()+1
        }
        if(dateFormatDate.getDate() < 9){
            day = "0"+(dateFormatDate.getDate()+1)
        }
        else{
            day = dateFormatDate.getDate()+1
        }
        date = dateFormatDate.getFullYear()+"-"+month+"-"+day
        // console.log(date)   
        return date

    }

    const createTask = () => {
        expandModal(
            {
                "taskName": null, 
                "taskCompletion": false, 
                "taskAssignee": null, 
                "taskPriority": null, 
                "taskStatus": null, 
                "taskDeadline": null, 
            }
        )

        
    }


    return (
        <>
        <div className = "section-arena">
            <div className = "section section-0">           
                <div className="section-head">
                    <input className="section-name" placeholder="Section Name"></input>
                    <h3 className="add-task" onClick={createTask}>+</h3>
                    <sup><h3 className="more-options">...</h3></sup>    
                </div>
                <div className="task-arena">
                    {error && <p>{error}</p>}
                    {taskList && taskList.map((task) => (
                        <TaskCard task={task} expandModal={expandModal} key ={task.id} />                        
                    ))}
                </div>
            </div>            
        </div>
        {selectedTask != null && <TaskModal taskInfo = {selectedTask} show = {show} closeModal = {closeModal} refreshTaskList={setTaskList} rerender={rerender} setRerender={setRerender} />}
        </>
    );
}
 
export default SectionArena;