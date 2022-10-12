import React, { useState } from 'react';
import TaskModal from './TaskModal';
import TaskCard from './TaskCard';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import SectionCard from './SectionCard';

// export const TaskNameContext = createContext();

const SectionArena = () => {
    const [show, setShow] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);    

    const [taskList, setTaskList] = useState(null);
    const [sectionList, setSectionList] = useState(null);
    
    const [error, setError] = useState(null);
    
    const [rerender, setRerender] = useState(false);
    // const [taskName, setTaskName] = useState("")
    



    const expandModal = (taskInfo, sectionInfo) => {
        setSelectedTask(taskInfo);
        setSelectedSection(sectionInfo);
        setShow(true);
    }

    const closeModal = () => {
        setSelectedTask(null);
        setSelectedSection(null);
        setShow(false); 
    }

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


    useEffect(()=>{
        fetch('http://localhost:8000/sectionList')
        .then(res => {
            // console.log(res);
            if(!res.ok){
                throw Error('Not able to fetch the SectionList');
            }
            return res.json();

        })
        .then(data => {
            setSectionList(data);
            setError(null);
        })
        .catch(err => {
            setError(err.message);
            setSectionList(null);
        });
    },[]);

    // console.log(sectionList)



    
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

    const createTask = (sectionInfo) => {
        expandModal(
            {
                "taskName": null, 
                "taskCompletion": false, 
                "taskAssignee": null, 
                "taskPriority": "Choose Priority", 
                "taskStatus": "Choose Status", 
                "taskDeadline": null, 
            },
            sectionInfo
        )

        
    }
    // {sectionList && console.log(sectionList[0].taskList.length)}

    
    return (
        <>
        <div className = "section-arena">
            {sectionList && sectionList.map((section) => (
                <SectionCard createTask = {createTask} error = {error} taskList={taskList} expandModal = {expandModal} section={section} rerender={rerender} setRerender={setRerender} key = {section.id}/>          
            ))} 
        </div>
        {/* {selectedTask != null && 
        <TaskNameContext.Provider value =  {{selectedTask,setTaskName}}>
        </TaskNameContext.Provider>
        } */}
            {selectedTask != null && <TaskModal taskInfo = {selectedTask} sectionInfo={selectedSection} show = {show} closeModal = {closeModal} rerender={rerender} setRerender={setRerender} />}
        </>
    );
}
 
export default SectionArena;