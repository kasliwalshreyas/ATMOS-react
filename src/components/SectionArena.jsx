import React, { useState } from 'react';
import TaskModal from './TaskModal';
import { useEffect } from 'react';
import SectionCard from './SectionCard';

// export const TaskNameContext = createContext();

const SectionArena = () => {
    const [show, setShow] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);

    const [taskList, setTaskList] = useState(null);
    const [sectionList, setSectionList] = useState(null);

    const [error, setError] = useState(null);

    //state variable to re-render the Section Arena when a task or a section is added, deleted or updated
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

    //fetch request to get taskList (At the moment this gets all the tasks, In node it has to implemented in such a way that only task of this specific section are send)
    useEffect(() => {
        fetch("http://localhost:8000/taskList")
            .then(res => {
                // console.log(res);
                if (!res.ok) {
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

    //fetch request to get sectionList (At the moment this gets all the sections, In node it has to implemented in such a way that only sections of this specific section are send)
    useEffect(() => {
        fetch('http://localhost:8000/sectionList')
            .then(res => {
                // console.log(res);
                if (!res.ok) {
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
    }, [rerender]);


    //func to standarized date format
    // function getDate(strFormatDate) {
    //     // const strFormatDate = "08-10-2022";
    //     const dateFormatDate = new Date(strFormatDate)
    //     let day, month, date
    //     if (dateFormatDate.getMonth() < 9) {
    //         month = "0" + (dateFormatDate.getMonth() + 1)
    //     }
    //     else {
    //         month = dateFormatDate.getMonth() + 1
    //     }
    //     if (dateFormatDate.getDate() < 9) {
    //         day = "0" + (dateFormatDate.getDate() + 1)
    //     }
    //     else {
    //         day = dateFormatDate.getDate() + 1
    //     }
    //     date = dateFormatDate.getFullYear() + "-" + month + "-" + day
    //     // console.log(date)   
    //     return date

    // }

    //func to create Task
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

    //func to create Section
    const createSection = () => {
        fetch('http://localhost:8000/sectionList', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "sectionName": "",
                "projectId": 0,
                "taskIDList": [],
            })
        })
            .then((res) => {
                console.log("New Section Added");
                setRerender(!rerender)
            })
    }


    return (
        <>
            <div className="section-arena">
                {sectionList && sectionList.map((section) => (
                    <SectionCard
                        createTask={createTask}
                        error={error}
                        taskList={taskList}
                        expandModal={expandModal}
                        section={section}
                        rerender={rerender}
                        setRerender={setRerender}
                        key={section.id} />
                ))}
                <div className='add-section-div' onClick={createSection} ><img className="add-section-img" src="https://img.icons8.com/sf-regular/48/000000/add.png" /><p>Add Section</p></div>
            </div>
            {/* {selectedTask != null && 
        <TaskNameContext.Provider value =  {{selectedTask,setTaskName}}>
        </TaskNameContext.Provider>
        } */}
            {selectedTask != null &&
                <TaskModal
                    taskInfo={selectedTask}
                    sectionInfo={selectedSection}
                    show={show}
                    closeModal={closeModal}
                    rerender={rerender}
                    setRerender={setRerender} />}
        </>
    );
}

export default SectionArena;