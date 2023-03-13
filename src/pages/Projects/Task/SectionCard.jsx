import { useState } from "react";
import TaskCard from "./TaskCard";
import React from "react"
import { Droppable } from "react-beautiful-dnd";



const SectionCard = ({ createTask, error, taskList, expandModal, section: sectionInfo, rerender, setRerender, projectInfo }) => {
    const [sectionName, setSectionName] = useState(sectionInfo.sectionName);
    const [isSectionOptionClicked, setIsSectionOptionClicked] = useState(false);

    const saveSectionName = async (event) => {
        const sectionID = sectionInfo._id;
        const response = await fetch(`http://localhost:4000/section/renameSection/${sectionID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'auth-token': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({ sectionName: event.nativeEvent.target.value })
        })
        const data = await response.json();
        console.log(data, 'Section Name Updated');
        setSectionName(event.nativeEvent.target.value);
    }
    const handleSectionOptionClicked = (event) => {
        event.stopPropagation();
        setIsSectionOptionClicked(true);
    }

    const deleteSection = async (event) => {
        event.stopPropagation();

        const sectionID = sectionInfo._id;
        const response = await fetch(`http://localhost:4000/section/deleteSection/${sectionID}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'auth-token': `Bearer ${localStorage.getItem('token')}` }
        })
        const data = await response.json();
        console.log(data, 'Section Deleted');
        setRerender(!rerender);
    }

    const handleClickOutside = (event) => {
        event.stopPropagation();
        setIsSectionOptionClicked(false);
    }


    return (
        <>
            <div className={isSectionOptionClicked ? "show-section-option" : "hide-section-option"} onClick={handleClickOutside}></div>
            <Droppable droppableId={sectionInfo._id.toString()}>
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
                                    <p className="section-dropdown-menu-option" onClick={(e) => deleteSection(e)}>Delete Section</p>
                                    <p className="section-dropdown-menu-option">Add Section To Left</p>
                                    <p className="section-dropdown-menu-option">Add Section To Right</p>
                                </div>
                            </div>
                        </div>
                        <div className="task-arena">
                            {error && <p>{error}</p>}
                            {taskList && taskList.map((task) => (
                                <TaskCard
                                    index={task._id}
                                    task={task}
                                    section={sectionInfo}
                                    projectId={projectInfo.projectId}
                                    expandModal={expandModal}
                                    rerender={rerender}
                                    setRerender={setRerender}
                                    key={task._id} />
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