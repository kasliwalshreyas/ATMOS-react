import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { useEffect } from "react";
import SectionCard from "./SectionCard";
import { DragDropContext } from "react-beautiful-dnd";

const SectionArena = ({ projectId, projectInfo, setProjectInfo, userInfo }) => {
  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [taskList, setTaskList] = useState(null);
  const [sectionList, setSectionList] = useState(null);
  const [error, setaskListtError] = useState(null);

  //state variable to re-render the Section Arena when a task or a section is added, deleted or updated
  const [rerender, setRerender] = useState(false);

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

  useEffect(() => {
    setSectionList(projectInfo.projectSectionIdList);
    setTaskList(projectInfo.projectTaskIdList);

    console.log(projectInfo, "projectInfo");
  }, [projectInfo]);


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




  //func to swap the taskIDList of two sections
  function changePos(arr, i, j) {
    // console.log("before sliced", arr, i, j);
    // let srcElement = arr[i];
    // let desElement = arr[j];
    if (i > j) {
      let upper = arr.slice(0, j);
      let middle = arr.slice(j, i);
      let src = arr.slice(i, i + 1);
      let lower = arr.slice(i + 1, arr.length);
      // console.log("after sliced", upper, middle, src, lower);

      arr = upper.concat(src, middle, lower);
      // console.log("new", arr);
      return arr;
    } else if (i < j) {
      let upper = arr.slice(0, i);
      let src = arr.slice(i, i + 1);
      let middle = arr.slice(i + 1, j + 1);
      let lower = arr.slice(j + 1, arr.length);

      arr = upper.concat(middle, src, lower);
      // console.log("new", arr);
      return arr;
    }
  }

  function findIndex(sectionTaskList, taskId) {
    for (let i = 0; i < sectionTaskList.length; i++) {
      if (sectionTaskList[i].id == taskId) return i;
    }
  }

  function changePosInDiffArray(srcArr, desArr, srcIndex, desIndex) {
    //remove from src
    let srcElement = srcArr[srcIndex];
    srcArr.splice(srcIndex, 1);
    // console.log("removed srcElement", srcArr);

    //add to des
    desArr.splice(desIndex, 0, srcElement);
    // console.log("added desElement", desArr);

    // // console.log("before Swap", arr1, arr2, i1, i2);
    // const temp = arr1[i1];
    // arr1[i1] = arr2[i2];
    // arr2[i2] = temp;
    // // console.log("after Swap", arr1, arr2, i1, i2);
  }

  const handleOnDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    let sourceDroppableId = findIndex(
      sectionList,
      parseInt(source.droppableId)
    );
    let destDroppableId = findIndex(
      sectionList,
      parseInt(destination.droppableId)
    );
    console.log(sourceDroppableId, destDroppableId);
    if (destination == null) {
      return;
    }

    if (
      destDroppableId === sourceDroppableId &&
      destination.index === source.index
    ) {
      return;
    } else if (destDroppableId === sourceDroppableId) {
      console.log("before swap", sectionList);
      // console.log(destDroppableId, sourceDroppableId);
      // console.log(sectionList[sourceDroppableId]);
      // console.log(sectionList[destDroppableId]);
      setSectionList((prev) => {
        const temp = prev.slice();

        // console.log("before", temp);
        let indexofSource = findIndex(
          temp[sourceDroppableId].taskIDList,
          parseInt(source.index)
        );
        let indexofDestination = findIndex(
          temp[destDroppableId].taskIDList,
          parseInt(destination.index)
        );
        temp[sourceDroppableId].taskIDList = changePos(
          temp[sourceDroppableId].taskIDList,
          indexofSource,
          indexofDestination
        );
        // temp[sourceDroppableId] = temp[sourceDroppableId];
        // console.log("after swap", temp);
        return temp;
      });
    } else if (destDroppableId !== sourceDroppableId) {
      // console.log("before swap", sectionList);
      // console.log(destDroppableId, sourceDroppableId);
      setSectionList((prev) => {
        const temp = prev.slice();
        let indexofSource = findIndex(
          temp[sourceDroppableId].taskIDList,
          parseInt(source.index)
        );
        let indexofDestination = findIndex(
          temp[destDroppableId].taskIDList,
          parseInt(destination.index)
        );
        changePosInDiffArray(
          temp[sourceDroppableId].taskIDList,
          temp[destDroppableId].taskIDList,
          indexofSource,
          indexofDestination
        );
        // temp[sourceDroppableId] = temp[sourceDroppableId];
        // console.log("after swap", temp);
        return temp;
      });
    }
  };

  // console.log(sectionList);

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

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="section-arena">
          {sectionList &&
            sectionList.map((section) => (
              <SectionCard
                createTask={createTask}
                error={error}
                taskList={section.taskIdList}
                expandModal={expandModal}
                section={section}
                rerender={rerender}
                setRerender={setRerender}
                key={section._id}
                projectInfo={projectInfo}
              />
            ))}
          <div className="add-section-div" onClick={createSection}>
            <img
              className="add-section-img"
              src="https://img.icons8.com/sf-regular/48/000000/add.png"
            />
            <p className="paraChanges">Add Section</p>
          </div>
        </div>
      </DragDropContext>
      {selectedTask != null && (
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
      )}
    </>
  );
};

export default SectionArena;
