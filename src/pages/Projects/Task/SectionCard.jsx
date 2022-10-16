import { useState } from "react";
import TaskCard from "./TaskCard";

const SectionCard = ({ createTask, error, taskList, expandModal, section: sectionInfo, rerender, setRerender }) => {


    //custom hook so that correct dropdown box gets opened

    const [sectionName, setSectionName] = useState(sectionInfo.sectionName);
    const [isSectionOptionClicked, setIsSectionOptionClicked] = useState(false);


    const filterTaskList = (task) => {
        // console.log(task,sectionInfo.taskList)
        let flag = false;
        for (let i = 0; i < sectionInfo.taskIDList.length; i++) {
            if (task.id === sectionInfo.taskIDList[i]) {
                flag = true;
            }
        }
        return flag;
    }

    const taskList2 = taskList.filter(filterTaskList);
    // let taskList2;
    // if (taskList) {
    //     taskList2 = [];
    // }
    // else {
    //     taskList2 = taskList.filter(filterTaskList);
    // }
    // console.log(taskList2);

    const saveSectionName = (event) => {
        // console.log(sectionInfo);
        // console.log(event.nativeEvent.target.value);
        const sectionID = sectionInfo.id;
        sectionInfo.sectionName = event.nativeEvent.target.value;
        fetch(`http://localhost:8000/sectionList/${sectionID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sectionInfo)
        })
            .then(() => { console.log('Section Name Updated') })
            .catch(err => console.log(err.message));

    }


    const handleSectionOptionClicked = (event) => {
        event.stopPropagation();
        setIsSectionOptionClicked(true);
        // console.log(isSectionOptionClicked);
        // console.log('Option Clicked');
    }

    async function deleteTask(taskID) {
        const res = await fetch(`http://localhost:8000/taskList/${taskID}`, {
            method: 'DELETE'
        });
        // console.log("deleted task", taskID);
        return res;
    }

    async function deleteSection(sectionID) {

        for (let i = 0; i < taskList2.length; i++) {
            // console.log("inside delete section", i);
            let res3 = await deleteTask(taskList2[i].id);
        }

        const res = await fetch(`http://localhost:8000/sectionList/${sectionID}`, {
            method: 'DELETE'
        })
            .then(() => {
                console.log('Section Deleted');
                setRerender(!rerender);
            })
    }


    const handleClickOutside = (event) => {
        event.stopPropagation();
        setIsSectionOptionClicked(false);
    }




    return (
        <>
            <div className={isSectionOptionClicked ? "show-section-option" : "hide-section-option"} onClick={handleClickOutside}></div>
            <div className="section section-0">
                <div className="section-head">
                    <input
                        className="section-name"
                        placeholder="Section Name"
                        value={sectionName}
                        onChange={e => { setSectionName(e.target.value) }}
                        onBlur={saveSectionName}
                    ></input>
                    <img
                        className="add-task"
                        onClick={() => { createTask(sectionInfo) }}
                        src="https://img.icons8.com/sf-regular/48/000000/add.png"
                    />
                    <div className="section-options-div" >
                        <img
                            onClick={handleSectionOptionClicked}
                            className="section-options-img"
                            src="https://img.icons8.com/material-outlined/24/000000/more.png"
                        />
                        <div className={isSectionOptionClicked ? "section-dropdown-option-div" : "hide-section-option"} >
                            <p className="section-dropdown-menu-option" onClick={() => deleteSection(sectionInfo.id)}>Delete Section</p>
                            <p className="section-dropdown-menu-option">Add Section To Left</p>
                            <p className="section-dropdown-menu-option">Add Section To Right</p>
                        </div>
                    </div>
                </div>
                <div className="task-arena">
                    {error && <p>{error}</p>}
                    {taskList2 && taskList2.map((task) => (
                        // <TaskNameContext.Provider value = {{selectedTask,setTaskName}}>
                        <TaskCard
                            task={task}
                            section={sectionInfo}
                            expandModal={expandModal}
                            rerender={rerender}
                            setRerender={setRerender}
                            key={task.id} />
                        // </TaskNameContext.Provider>
                    ))}
                    <div className='add-task-div' onClick={() => { createTask(sectionInfo) }} ><img className="add-task-img-2" src="https://img.icons8.com/sf-regular/48/000000/add.png" /><p>Add Task</p></div>
                </div>
            </div>
        </>


    );
}

export default SectionCard;