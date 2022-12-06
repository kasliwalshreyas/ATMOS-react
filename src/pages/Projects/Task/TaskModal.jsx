import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import Select from "react-select";
import CommentArena from "./CommentArena";
import { useDispatch } from "react-redux";
import { assignTaskToUser, removeTaskFromUser } from "../../../features/userSlice";

const TaskModal = ({
  taskInfo,
  sectionInfo,
  show,
  closeModal,
  rerender,
  setRerender,
  projectInfo,
  AssigneeList,
  userInfo,
}) => {

  const dispatch = useDispatch();

  const taskCompletionOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const taskPriorityOptions = [
    { value: "Choose Priority", label: "Choose Priority" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const taskStatusOptions = [
    { value: "Choose Status", label: "Choose Status" },
    { value: "on-track", label: "On Track" },
    { value: "off-track", label: "Off Track" },
    { value: "at-risk", label: "At Risk" },
  ];

  let taskAssigneeLabel;
  for (let i = 0; i < AssigneeList.length; i++) {
    if (AssigneeList[i].value === taskInfo.taskAssignee) {
      taskAssigneeLabel = AssigneeList[i].label;
    }
  }
  let taskStatusLabel;
  for (let i = 0; i < taskStatusOptions.length; i++) {
    if (taskStatusOptions[i].value === taskInfo.taskStatus) {
      taskStatusLabel = taskStatusOptions[i].label;
    }
  }
  let taskPriorityLabel;
  for (let i = 0; i < taskPriorityOptions.length; i++) {
    if (taskPriorityOptions[i].value === taskInfo.taskPriority) {
      taskPriorityLabel = taskPriorityOptions[i].label;
    }
  }
  let taskCompletionLabel;
  for (let i = 0; i < taskCompletionOptions.length; i++) {
    if (taskCompletionOptions[i].value === taskInfo.taskCompletion) {
      taskCompletionLabel = taskCompletionOptions[i].label;
    }
  }

  // console.log(taskAssigneeLabel);

  const [taskName, setTaskName] = useState(taskInfo.taskName);
  const [taskCompletion, setTaskCompletion] = useState(taskInfo.taskCompletion);
  const [taskAssignee, setTaskAssignee] = useState(taskInfo.taskAssignee);
  const [taskPriority, setTaskPriority] = useState(taskInfo.taskPriority);
  const [taskStatus, setTaskStatus] = useState(taskInfo.taskStatus);
  const [taskDeadline, setTaskDeadline] = useState(taskInfo.taskDeadline);
  const [taskStartDate, SetTaskStartDate] = useState(taskInfo.taskStartDate);
  const [taskDescription, setTaskDescription] = useState(
    taskInfo.taskDescription
  );
  const [taskComments, setTaskComments] = useState(taskInfo.taskComments);
  const [selectedAssignee, setSelectedAssignee] = useState({
    value: taskAssignee,
    label: taskAssigneeLabel,
  });
  const [selectedCompletion, setSelectedCompletion] = useState({
    value: taskCompletion,
    label: taskCompletionLabel,
  });
  const [selectedPriority, setSelectedPriority] = useState({
    value: taskPriority,
    label: taskPriorityLabel,
  });
  const [selectedStatus, setSelectedStatus] = useState({
    value: taskStatus,
    label: taskStatusLabel,
  });
  const [updateTaskAssignee, setUpdateTaskAssignee] = useState({
    do: false,
    oldAssignee: null,
  });
  const [description, setDescription] = useState(true);
  const [comments, setComments] = useState(false);
  // console.log(selectedAssignee, selectedCompletion, selectedPriority, selectedStatus);
  // console.log(taskName, taskCompletion, taskAssignee, taskPriority, taskStatus, taskDeadline, taskDescription);

  const handleSubmit = (taskId, sectionId, sectionInfo) => {
    let taskData = {
      taskName,
      taskCompletion,
      taskAssignee,
      taskPriority,
      taskStatus,
      taskDeadline,
      taskStartDate,
      taskDescription,
      taskComments,
    };

    //Add Task with assignee
    console.log(taskId, taskAssignee);
    if (taskId == null && taskAssignee != null) {
      console.log("Need to Add Task with assignee");
      fetch("http://localhost:8000/taskList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          // console.log(response);
          let newTaskID = response.id;
          // console.log(response.id);
          // console.log("newTaskID",newTaskID)
          // console.log("Task Added");
          // console.log(newTaskID);
          return newTaskID;
        })
        .then((newTaskID) => {
          const sectionName = sectionInfo.sectionName;
          const projectId = sectionInfo.projectId;
          const taskIDList = sectionInfo.taskIDList;
          // console.log(newTaskID);
          let newTaskIDList = [];
          for (let i = 0; i < taskIDList.length; i++) {
            newTaskIDList.push(taskIDList[i].id);
          }
          newTaskIDList.push(newTaskID);

          // taskIDList.push({ ...taskData, id: newTaskID });
          // console.log(taskIDList, "new Task");
          const sectionData = {
            sectionName,
            projectId,
            taskIDList: newTaskIDList,
          };

          fetch(`http://localhost:8000/sectionList/${sectionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sectionData),
          }).then(async () => {
            console.log("Section TaskList Updated");
            // props.setRerender(!rerender)
            //Add task to userAssignedTaskList
            const res = await fetch(
              `http://localhost:8000/userList/${taskAssignee}`
            )
              .then((res) => {
                return res.json();
              })
              .then((response) => {
                // console.log(response.taskAssignedIDList, 'assignee Info fetched');
                if (userInfo.id === taskAssignee) {
                  dispatch(assignTaskToUser(newTaskID));
                }
                response.taskAssignedIDList.push(newTaskID);
                // console.log(response.taskAssignedIDList, 'assignee Info updated');
                return response;
              })
              .then(async (response) => {
                const res = await fetch(
                  `http://localhost:8000/userList/${taskAssignee}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response),
                  }
                )
                  .then((res) => {
                    return res.json();
                  })
                  .then((response) => {
                    // console.log(response.taskAssignedIDList, 'assignee Info updated in DB');
                    console.log("Assignee TaskList Updated");
                  });
              })
              .then(() => {
                console.log("Task Added");
                setRerender(!rerender);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //Add Task with no assignee
    else if (taskId == null && taskAssignee == null) {
      console.log("Need to Add Task with no assignee");
      fetch("http://localhost:8000/taskList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          // console.log(response);
          let newTaskID = response.id;
          // console.log(response.id);
          // console.log("newTaskID",newTaskID)
          // console.log("Task Added");
          // console.log(newTaskID);
          return newTaskID;
        })
        .then((newTaskID) => {
          const sectionName = sectionInfo.sectionName;
          const projectId = sectionInfo.projectId;
          const taskIDList = sectionInfo.taskIDList;
          // console.log(newTaskID);
          let newTaskIDList = [];
          for (let i = 0; i < taskIDList.length; i++) {
            newTaskIDList.push(taskIDList[i].id);
          }
          newTaskIDList.push(newTaskID);

          // taskIDList.push({ ...taskData, id: newTaskID });
          // console.log(taskIDList, "new Task");
          const sectionData = {
            sectionName,
            projectId,
            taskIDList: newTaskIDList,
          };

          fetch(`http://localhost:8000/sectionList/${sectionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sectionData),
          })
            .then(() => {
              console.log("Section TaskList Updated");
              // props.setRerender(!rerender)
            })
            .then(() => {
              console.log("Task Added");
              setRerender(!rerender);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    //Update Task with assignee change
    else if (taskId != null && updateTaskAssignee.do == true) {
      console.log("Need To Update Task with assignee change");
      fetch(`http://localhost:8000/taskList/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
        .then((res) => {
          return res.json();
        })
        .then(async (taskdata) => {
          console.log("Task Updated", taskdata);
          const newTaskID = taskdata.id;
          console.log(newTaskID);
          const res = await fetch(
            `http://localhost:8000/userList/${taskAssignee}`
          )
            .then((res) => {
              return res.json();
            })
            .then((response) => {
              // console.log(response);

              if (userInfo.id === taskAssignee) {
                dispatch(assignTaskToUser(newTaskID));
              }
              response.taskAssignedIDList.push(newTaskID);
              console.log(response.taskAssignedIDList, "assignee Info updated");
              return response;
            })
            .then(async (response) => {
              const res = await fetch(
                `http://localhost:8000/userList/${taskAssignee}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(response),
                }
              ).then(() => {
                console.log("New Assignee TaskList Updated");
              });
            });
          // .then(() => {
          //     console.log("Task Updated");
          //     // setRerender(!rerender);
          // });
          return newTaskID;
        })
        .then(async (newTaskID) => {
          console.log(newTaskID);
          const res = await fetch(
            `http://localhost:8000/userList/${updateTaskAssignee.oldAssignee}`
          )
            .then((res) => {
              return res.json();
            })
            .then((response) => {
              // console.log(response);

              if (userInfo.id === updateTaskAssignee.oldAssignee) {
                dispatch(removeTaskFromUser(newTaskID));
              }
              response.taskAssignedIDList = response.taskAssignedIDList.filter(
                (taskid) => taskid != newTaskID
              );
              console.log(
                response.taskAssignedIDList,
                " assignee Info updated"
              );
              return response;
            })
            .then(async (response) => {
              const res = await fetch(
                `http://localhost:8000/userList/${updateTaskAssignee.oldAssignee}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(response),
                }
              ).then(() => {
                console.log("prev Assignee TaskList Updated");
              });
            });
        })
        .then(() => {
          console.log("Task Updated");
          setRerender(!rerender);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    //Update Task with no assignee change
    else if (taskId != null && updateTaskAssignee.do == false) {
      console.log("Need To Update Task with no assignee change");
      fetch(`http://localhost:8000/taskList/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
        // .then((res) => {return res.json()})
        // .then((response) => {
        //     console.log(response);
        //     console.log("Task Updated");
        // })
        .then(() => {
          console.log("Task Updated");
          setRerender(!rerender);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    closeModal();
  };

  // console.log(projectInfo, "from modal")

  const handleTaskAssignee = (selectedOption) => {
    if (selectedAssignee.value !== selectedOption.value) {
      setUpdateTaskAssignee((prev) => {
        prev.do = true;
        prev.oldAssignee = selectedAssignee.value;
        return prev;
      });
      console.log("Assignee Changed", updateTaskAssignee);
    }
    setSelectedAssignee(selectedOption);
    setTaskAssignee(selectedOption.value);
    console.log("newAssignee", selectedOption.value);
  };
  const handleTaskCompletion = (selectedOption) => {
    setSelectedCompletion(selectedOption);
    setTaskCompletion(selectedOption.value);
  };
  const handleTaskPriority = (selectedOption) => {
    setSelectedPriority(selectedOption);
    setTaskPriority(selectedOption.value);
  };
  const handleTaskStatus = (selectedOption) => {
    setSelectedStatus(selectedOption);
    setTaskStatus(selectedOption.value);
  };

  const handleDescription = (e) => {
    setDescription(true);
    setComments(false);
  };
  const handleComments = (e) => {
    setDescription(false);
    setComments(true);
  };

  return (
    <div>
      <Modal show={show} onHide={closeModal} className="task-modal">
        {/* {console.log(props.show)} */}
        <Modal.Header closeButton className="task-modal-header">
          <Modal.Title className="task-path-text">
            {projectInfo.projectName}/{sectionInfo.sectionName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="task-modal-body">
          <table className="task-modal-table">
            <tbody className="task-modal-table-body">
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Task</td>
                <td className="task-modal-table-data">
                  <input
                    className="modal-task-input modal-input modal-select"
                    type="text"
                    placeholder="Enter Task"
                    value={taskName == null ? "" : taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Completed</td>
                <td className="task-modal-table-data">
                  <Select
                    className="modal-input"
                    // placeholder='Enter Assignee'
                    defaultValue={selectedCompletion}
                    options={taskCompletionOptions}
                    onChange={handleTaskCompletion}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        // border: '1px solid #ccc',
                        color: "black",
                        backgroundColor: state.isSelected
                          ? "lightgray"
                          : "white",
                        backgroundColor: state.isFocused
                          ? "lightgray"
                          : "white",
                        ":active": {
                          backgroundColor: state.isSelected
                            ? "lightgray"
                            : "white",
                          // border: '1px solid #ccc'
                        },
                        padding: 10,
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        color: "black",
                        border: "1px solid #ccc",
                        width: "fit-content",
                        minWidth: "max-content",
                        boxShadow: "none",

                        // backgroundColor: '#edf5e1',

                        ":hover": {
                          border: "1px solid #ccc",
                        },
                      }),
                      container: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#d3f4a2',
                        // display: 'inline-flex',
                        // flexDirection: 'row',
                        // marginRight: 20
                        // minWidth: '250px'
                      }),
                      valueContainer: (provided, state) => ({
                        ...provided,
                        display: "flex",
                        width: "250px",
                        color: "black",

                        // backgroundColor: '#edf5e1',

                        // width: 'fit-content',
                        // minWidth: 'max-content',
                      }),
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // zIndex: 1,
                        // backgroundColor: '#edf5e1',
                      }),
                      input: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                        svg: {
                          // backgroundColor: "#edf5e1",
                        },
                      }),
                      menu: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                    }}
                  />
                  {/* <select className='modal-input modal-select' value={taskCompletion ? "completed" : "incompleted"} onChange={(e) => { if (e.target.value === "completed") { setTaskCompletion(true) } else { setTaskCompletion(false) } }}>
                                        <option className='modal-select-option' value="completed">Yes</option>
                                        <option className='modal-select-option' value="incompleted">No</option>
                                    </select> */}
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Assignee</td>
                <td className="task-modal-table-data">
                  <Select
                    className="modal-input"
                    placeholder="Enter Assignee"
                    defaultValue={selectedAssignee}
                    options={AssigneeList}
                    onChange={handleTaskAssignee}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        // border: '1px solid #ccc',
                        color: "black",
                        backgroundColor: state.isSelected
                          ? "lightgray"
                          : "white",
                        backgroundColor: state.isFocused
                          ? "lightgray"
                          : "white",
                        ":active": {
                          backgroundColor: state.isSelected
                            ? "lightgray"
                            : "white",
                          // border: '1px solid #ccc'
                        },
                        padding: 10,
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        color: "black",
                        border: "1px solid #ccc",
                        width: "fit-content",
                        minWidth: "max-content",
                        boxShadow: "none",

                        // backgroundColor: '#edf5e1',

                        ":hover": {
                          border: "1px solid #ccc",
                        },
                      }),
                      container: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#d3f4a2',
                        // display: 'inline-flex',
                        // flexDirection: 'row',
                        // marginRight: 20
                        // minWidth: '250px'
                      }),
                      valueContainer: (provided, state) => ({
                        ...provided,
                        display: "flex",
                        width: "250px",
                        color: "black",

                        // backgroundColor: '#edf5e1',

                        // width: 'fit-content',
                        // minWidth: 'max-content',
                      }),
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // zIndex: 1,
                        // backgroundColor: '#edf5e1',
                      }),
                      input: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                        svg: {
                          // backgroundColor: "#edf5e1",
                        },
                      }),
                      menu: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                    }}
                  />
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Priority</td>
                <td className="task-modal-table-data">
                  <Select
                    className="modal-input"
                    placeholder="Choose Priority"
                    defaultValue={selectedPriority}
                    options={taskPriorityOptions}
                    onChange={handleTaskPriority}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        // border: '1px solid #ccc',
                        color: "black",
                        backgroundColor: state.isSelected
                          ? "lightgray"
                          : "white",
                        backgroundColor: state.isFocused
                          ? "lightgray"
                          : "white",
                        ":active": {
                          backgroundColor: state.isSelected
                            ? "lightgray"
                            : "white",
                          // border: '1px solid #ccc'
                        },
                        padding: 10,
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        color: "black",
                        border: "1px solid #ccc",
                        width: "fit-content",
                        minWidth: "max-content",
                        boxShadow: "none",

                        // backgroundColor: '#edf5e1',

                        ":hover": {
                          border: "1px solid #ccc",
                        },
                      }),
                      container: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#d3f4a2',
                        // display: 'inline-flex',
                        // flexDirection: 'row',
                        // marginRight: 20
                        // minWidth: '250px'
                      }),
                      valueContainer: (provided, state) => ({
                        ...provided,
                        display: "flex",
                        width: "250px",
                        color: "black",

                        // backgroundColor: '#edf5e1',

                        // width: 'fit-content',
                        // minWidth: 'max-content',
                      }),
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // zIndex: 1,
                        // backgroundColor: '#edf5e1',
                      }),
                      input: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                        svg: {
                          // backgroundColor: "#edf5e1",
                        },
                      }),
                      menu: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                    }}
                  />
                  {/* <select className='modal-input modal-select' value={taskPriority} onChange={(e) => { setTaskPriority(e.target.value) }}>
                                        <option value="Choose Priority">Choose Priority</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select> */}
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Status</td>
                <td className="task-modal-table-data">
                  <Select
                    className="modal-input"
                    placeholder="Choose Status"
                    defaultValue={selectedStatus}
                    options={taskStatusOptions}
                    onChange={handleTaskStatus}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        // border: '1px solid #ccc',
                        color: "black",
                        backgroundColor: state.isSelected
                          ? "lightgray"
                          : "white",
                        backgroundColor: state.isFocused
                          ? "lightgray"
                          : "white",
                        ":active": {
                          backgroundColor: state.isSelected
                            ? "lightgray"
                            : "white",
                          // border: '1px solid #ccc'
                        },
                        padding: 10,
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        color: "black",
                        border: "1px solid #ccc",
                        width: "fit-content",
                        minWidth: "max-content",
                        boxShadow: "none",

                        // backgroundColor: '#edf5e1',

                        ":hover": {
                          border: "1px solid #ccc",
                        },
                      }),
                      container: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#d3f4a2',
                        // display: 'inline-flex',
                        // flexDirection: 'row',
                        // marginRight: 20
                        // minWidth: '250px'
                      }),
                      valueContainer: (provided, state) => ({
                        ...provided,
                        display: "flex",
                        width: "250px",
                        color: "black",

                        // backgroundColor: '#edf5e1',

                        // width: 'fit-content',
                        // minWidth: 'max-content',
                      }),
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // zIndex: 1,
                        // backgroundColor: '#edf5e1',
                      }),
                      input: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                        svg: {
                          // backgroundColor: "#edf5e1",
                        },
                      }),
                      menu: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                    }}
                  />
                  {/* <select className='modal-input modal-select' value={taskStatus} onChange={(e) => { setTaskStatus(e.target.value) }}>
                                        <option value="Choose Status">Choose Status</option>
                                        <option value="on-track">On Track</option>
                                        <option value="off-track">Off Track</option>
                                        <option value="at-risk">At Risk</option>
                                    </select> */}
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Deadline</td>
                <td className="task-modal-table-data">
                  <input
                    className="modal-input modal-select"
                    type="date"
                    value={taskDeadline == null ? "" : taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <Nav className="task-modal-nav-bar" as="ul">
            <Nav.Item as="li">
              <Nav.Link
                className="active-nav-option task-modal-nav-option task-modal-option-1"
                onClick={handleDescription}
              >
                Description
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                className="task-modal-nav-option task-modal-option-2"
                onClick={handleComments}
              >
                Comments
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <hr className="task-modal-line-below-nav"></hr>
          {description && (
            <div className="task-modal-description-div">
              <textarea
                className="task-modal-description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                rows={5}
                placeholder="describe your task for your team members"
              ></textarea>
            </div>
          )}
          {comments && (
            <div>
              <CommentArena
                taskInfo={taskInfo}
                taskComments={taskComments}
                setTaskComments={setTaskComments}
                userInfo={userInfo}
              />
              {/* <textarea className='task-modal-description' value={taskComments} onChange={(e) => setTaskComments(e.target.value)} rows={5} placeholder="add comments for your team members" ></textarea> */}
            </div>
          )}
          {/* <div className='task-modal-button-container'>
                        <button className='task-modal-button' onClick={handleSave}>Save</button>
                        <button className='task-modal-button' onClick={handleDelete}>Delete</button>
                    </div> */}

          {/* To Do: Make description active */}
        </Modal.Body>
        <Modal.Footer className="task-modal-footer">
          <Button
            variant="primary"
            onClick={() => {
              // console.log(taskInfo)
              // console.log(props.taskInfo)
              handleSubmit(taskInfo.id, sectionInfo.id, sectionInfo);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskModal;
