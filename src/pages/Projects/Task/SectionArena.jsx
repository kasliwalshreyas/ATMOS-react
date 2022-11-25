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

  const [error, setError] = useState(null);

  //state variable to re-render the Section Arena when a task or a section is added, deleted or updated
  const [rerender, setRerender] = useState(false);
  // const [taskName, setTaskName] = useState("")

  // console.log(projectId);

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


  const populateTask = (sec, task) => {
    // console.log(data);

    if (sec) {
      for (let i = 0; i < sec.length; i++) {
        for (let j = 0; j < sec[i].taskIDList.length; j++) {
          sec[i].taskIDList[j] = task.find(
            (element) => element.id === sec[i].taskIDList[j]
          );
        }
      }
    }
    // console.log("populated", sec);
    return sec;
  };
  //fetch request to get sectionList (At the moment this gets all the sections, In node it has to implemented in such a way that only sections of this specific section are send)

  useEffect(() => {
    fetch(`http://localhost:8000/sectionList?projectId_like=${projectId}`)
      .then((res) => {
        // console.log("sectionList fetched", res);
        if (!res.ok) {
          throw Error("Not able to fetch the SectionList");
        }
        return res.json();
      })
      .then(async (sec) => {
        // console.log(sec);
        const task = await fetch("http://localhost:8000/taskList").then(
          (res) => {
            // console.log(res);
            if (!res.ok) {
              throw Error("Not able to fetch the TaskList");
            }
            return res.json();
          }
        );
        return [sec, task];
      })
      .then(([sec, task]) => {
        // console.log(sec, task);
        setTaskList(task);
        setError(null);
        return [sec, task];
      })
      .then(([sec, task]) => {
        // console.log(sec, task);
        sec = populateTask(sec, task);
        setSectionList(sec);
        setError(null);
      })
      .catch((err) => {
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
        taskName: null,
        taskCompletion: false,
        taskAssignee: null,
        taskPriority: "Choose Priority",
        taskStatus: "Choose Status",
        taskDeadline: null,
        taskDescription: "",
        taskComments: [],
      },
      sectionInfo
    );
  };

  //func to create Section
  const createSection = async () => {
    const sec = await fetch("http://localhost:8000/sectionList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sectionName: "",
        projectId: projectId,
        taskIDList: [],
      }),
    }).then((res) => {
      console.log("New Section Added");
      // setRerender(!rerender);
      return res.json();
    });
    console.log(sec, 'new section');

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

    projectInfo.sectionIDList.push(sec.id);
    projectData.sectionIDList.push(sec.id);
    console.log(projectData, 'projectData');
    console.log(projectInfo, 'projectInfo');
    const project = await fetch(`http://localhost:8000/projectList/${projectId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData)
    }).then((res) => {
      console.log("Project Updated");
      setRerender(!rerender);
      return res.json();
    }
    );
    setProjectInfo(projectInfo);
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
  for (let i = 0; i < projectInfo.highAccess.length; i++) {
    AssigneeList.push({ value: projectInfo.highAccess[i].id, label: projectInfo.highAccess[i].userName });
  }
  for (let i = 0; i < projectInfo.mediumAccess.length; i++) {
    AssigneeList.push({ value: projectInfo.mediumAccess[i].id, label: projectInfo.mediumAccess[i].userName });
  }
  for (let i = 0; i < projectInfo.lowAccess.length; i++) {
    AssigneeList.push({ value: projectInfo.lowAccess[i].id, label: projectInfo.lowAccess[i].userName });
  }
  // console.log(AssigneeList, 'assigneeList')

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="section-arena">
          {console.log(sectionList)}

          {sectionList &&
            sectionList.map((section) => (
              <SectionCard
                createTask={createTask}
                error={error}
                taskList={section.taskIDList}
                expandModal={expandModal}
                section={section}
                rerender={rerender}
                setRerender={setRerender}
                key={section.id}
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
      {/* {selectedTask != null && 
        <TaskNameContext.Provider value =  {{selectedTask,setTaskName}}>
        </TaskNameContext.Provider>
        } */}
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
