import { useState } from "react";
import TaskCard from "./TaskCard";
import React from "react"
import { Droppable } from "react-beautiful-dnd";



const SectionCard = ({ createTask, error, taskList, expandModal, section: sectionInfo, rerender, setRerender, projectInfo }) => {

    // console.log("section", sectionInfo);
    // console.log("taskList", taskList);


    const [sectionName, setSectionName] = useState(sectionInfo.sectionName);
    const [isSectionOptionClicked, setIsSectionOptionClicked] = useState(false);


    const saveSectionName = (event) => {
        const taskIDList = sectionInfo.taskIDList;
        let newTaskIDList = []
        for (let i = 0; i < taskIDList.length; i++) {
            newTaskIDList.push(taskIDList[i].id);
        }

        const sectionID = sectionInfo.id;
        sectionInfo.sectionName = event.nativeEvent.target.value;
        const sectionData = { sectionName: event.nativeEvent.target.value, projectId: sectionInfo.projectId, taskIDList: newTaskIDList }

        // console.log(sectionInfo);
        fetch(`http://localhost:8000/sectionList/${sectionID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sectionData)
        })
            .then((res) => { return res.json() })
            .then((res2) => { console.log(res2, 'Section Name Updated') })
            .catch(err => console.log(err.message));

    }


    const handleSectionOptionClicked = (event) => {
        event.stopPropagation();
        setIsSectionOptionClicked(true);
    }

    // console.log(sectionInfo);

    async function deleteTaskFromUser(taskID, taskAssignee) {
        const res = await fetch(`http://localhost:8000/userList/${taskAssignee}`)
            .then((res) => { return res.json() })
            .then((AssigneeData) => {
                // const taskIDList = res2.taskIDList.filter((task) => { return !(task.id === taskID) });
                // const userData = { ...res2, taskIDList };
                // console.log(taskID);
                AssigneeData.taskAssignedIDList = AssigneeData.taskAssignedIDList.filter((taskid) => { return !(taskid === taskID) });
                console.log(AssigneeData);
                fetch(`http://localhost:8000/userList/${taskAssignee}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(AssigneeData)
                })
                    .then(() => {
                        console.log("Deleted Task from User");
                    });
            }
            )
        return res;
    }

    async function deleteTask(taskID, assigneeID) {

        if (assigneeID) {
            const res1 = await deleteTaskFromUser(taskID, assigneeID);
        }

        const res = await fetch(`http://localhost:8000/taskList/${taskID}`, {
            method: 'DELETE'
        });
        // console.log("deleted task", taskID);
        return res;
    }

    async function deleteSection(sectionID) {

        //delete task inside section
        for (let i = 0; i < taskList.length; i++) {
            // console.log("inside delete section", i);
            let res3 = await deleteTask(taskList[i].id, taskList[i].taskAssignee);
        }

        //delete section
        const res = await fetch(`http://localhost:8000/sectionList/${sectionID}`, {
            method: 'DELETE'
        })
            .then((res) => {
                console.log('Section Deleted');
                return res.json();
            })

        console.log(res, 'section...')
        //update project sectionIDList
        const projectData = JSON.parse(JSON.stringify(projectInfo));
        for (let i = 0; i < projectData.highAccess.length; i++) {
            projectData.highAccess[i] = projectInfo.highAccess[i].id;
        }
        for (let i = 0; i < projectData.mediumAccess.length; i++) {
            projectData.mediumAccess[i] = projectInfo.mediumAccess[i].id;
        }
        for (let i = 0; i < projectData.lowAccess.length; i++) {
            projectData.lowAccess[i] = projectInfo.lowAccess[i].id;
        }

        projectInfo.sectionIDList = projectInfo.sectionIDList.filter((sectionid) => { return !(sectionid === sectionID) });
        projectData.sectionIDList = projectData.sectionIDList.filter((sectionid) => { return !(sectionid === sectionID) });
        const res2 = await fetch(`http://localhost:8000/projectList/${sectionInfo.projectId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        })
            .then((response) => {
                return response.json()
            }
            )
            .then((project) => {
                console.log(project, 'Project Updated');
                setRerender(!rerender);
                return project;
            }
            )

    }


    const handleClickOutside = (event) => {
        event.stopPropagation();
        setIsSectionOptionClicked(false);
    }


    // console.log(taskList2);

    return (
        <>
            <div className={isSectionOptionClicked ? "show-section-option" : "hide-section-option"} onClick={handleClickOutside}></div>
            <Droppable droppableId={sectionInfo.id.toString()}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="section section-0">
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
                            {/* {console.log(taskList)} */}
                            {taskList && taskList.map((task) => (
                                <TaskCard
                                    index={task.id}
                                    task={task}
                                    section={sectionInfo}
                                    expandModal={expandModal}
                                    rerender={rerender}
                                    setRerender={setRerender}
                                    key={task.id} />
                            ))}
                            {provided.placeholder}
                            <div className='add-task-div' onClick={() => { createTask(sectionInfo) }} ><img className="add-task-img-2" src="https://img.icons8.com/sf-regular/48/000000/add.png" /><p className="paraChanges">Add Task</p></div>
                        </div>
                    </div>
                )}
            </Droppable>
        </>


    );
}

export default SectionCard;