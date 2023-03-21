import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { useEffect } from "react";
import SectionCard from "./SectionCard";
import { Button } from "@mantine/core";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useListState } from "@mantine/hooks";


const SectionArena = ({ projectId, projectInfo, setProjectInfo, userInfo, setUserInfo }) => {
  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [taskList, setTaskList] = useState(projectInfo.projectTaskIdList);
  const [sectionList, setSectionList] = useState(projectInfo.projectSectionIdList);
  const [rerender, setRerender] = useState(false);
  const [columnOrder, setColumnOrder] = useState([]);

  const [state, handlers] = useListState([columnOrder]);


  useEffect(() => {
    const user = async () => {
      const res = await fetch("http://localhost:4000/user/getUserInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      // console.log(data, 'userInfo from main view');
      setUserInfo(data.user);
      return data;
    }
    user();
  }, [rerender]);


  useEffect(() => {
    const project = async () => {
      const res = await fetch(`http://localhost:4000/project/getProjectDetails/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      // console.log(data, 'projectInfo from main view');
      setProjectInfo(data.project);
      setSectionList(data.project.projectSectionIdList);
      //calulate the column order
      let columnOrderTemp = [];
      let i = 0;
      data.project.projectSectionIdList.forEach((section) => {
        columnOrderTemp.push(i);
        i++;
      });
      setColumnOrder(columnOrderTemp);
      // handlers.setState(columnOrderTemp);
      setTaskList(data.project.projectTaskIdList);
      return data;
    }
    project();
  }, [rerender]);

  const expandModal = (taskInfo, sectionInfo) => {
    setSelectedTask(taskInfo);
    setSelectedSection(sectionInfo);
    setShow(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setSelectedSection(null);
    setShow(false);
  };

  // useEffect(() => {
  //   setSectionList(projectInfo.projectSectionIdList);
  //   setTaskList(projectInfo.projectTaskIdList);

  //   console.log(projectInfo, "projectInfo");
  // }, [rerender]);


  //func to create Task
  const createTask = (sectionInfo) => {
    expandModal(
      {
        taskName: null,
        taskCompletion: false,
        taskAssigneeList: null,
        taskPriority: "Choose Priority",
        taskStatus: "Choose Status",
        taskDeadline: null,
        taskDescription: "",
        taskStartDate: new Date(),
        taskComments: [],
      },
      sectionInfo
    );
    setRerender(!rerender);
  };

  const createSection = async () => {
    const sec = await fetch("http://localhost:4000/section/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({
        sectionName: "",
        projectId: projectId,
      })
    });
    const data = await sec.json();
    console.log(data, 'new section');
    setProjectInfo(data.project);
    setSectionList(data.project.projectSectionIdList);
    setTaskList(data.project.projectTaskIdList);
    setRerender(!rerender);

  };

  // console.log(sectionList, "sectionList from sectionArena");

  const AssigneeList = [];
  for (let i = 0; i < projectInfo.projectHighAccessMembers.length; i++) {
    AssigneeList.push({ value: projectInfo.projectHighAccessMembers[i]._id, label: projectInfo.projectHighAccessMembers[i].userName });
  }
  for (let i = 0; i < projectInfo.projectMediumAccessMembers.length; i++) {
    AssigneeList.push({ value: projectInfo.projectMediumAccessMembers[i]._id, label: projectInfo.projectMediumAccessMembers[i].userName });
  }
  for (let i = 0; i < projectInfo.projectLowAccessMembers.length; i++) {
    AssigneeList.push({ value: projectInfo.projectLowAccessMembers[i]._id, label: projectInfo.projectLowAccessMembers[i].userName });
  }
  // console.log(AssigneeList, 'assigneeList')

  console.log(state, 'state');

  const onDragEndFunc = (result) => {

    console.log(result, 'result');
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.droppableId === 'dnd-list') {
      const items = Array.from(columnOrder);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      handlers.setState(items);
      setColumnOrder(items);
      return;
    }
  };



  return (
    <>
      <div
        className="section-arena-container"
      >
        <DragDropContext
          onDragEnd={(result) => { onDragEndFunc(result) }}
        >
          <Droppable
            droppableId="dnd-list"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div className="section-arena" {...provided.droppableProps} ref={provided.innerRef}>
                {columnOrder && columnOrder.map((columnIndex, index) => (
                  <Draggable
                    key={columnIndex}
                    draggableId={'' + columnIndex}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <SectionCard

                          projectInfo={projectInfo}
                          section={sectionList[columnIndex]}
                          taskList={sectionList[columnIndex].taskIdList}

                          createTask={createTask}
                          expandModal={expandModal}

                          setRerender={setRerender}
                          rerender={rerender}

                          //props for draggable
                          sectionIndex={index}
                        // handleProvided={provided}
                        />

                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="section-arena">
          <Button w={315} color="blue" onClick={createSection}>Add Section</Button>
        </div>
      </div>
      {
        selectedTask != null && (
          <TaskModal
            taskInfo={selectedTask}
            sectionInfo={selectedSection}
            show={show}
            closeModal={closeModal}
            rerender={rerender}
            setRerender={setRerender}
            projectInfo={projectInfo}
            AssigneeList={AssigneeList}
            userInfo={userInfo}
          />
        )
      }
    </>
  );
};

export default SectionArena;
