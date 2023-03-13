import React from "react";
import { useState } from "react";
import useFetch from "../../useFetch";
import styles from "./UpcomingTask.module.css";
import { Link } from "react-router-dom";
const UpcomingTask = ({ user }) => {
  const [userInfo, setUserInfo] = useState(user);
  // const {
  //   data: tasksList,
  //   isPending,
  //   error,
  // } = useFetch("http://localhost:8000/taskList");
  // console.log(tasksList)
  // tasksList && console.log(tasksList)

  const [tasksList, setTasksList] = useState(user.taskAssignedIdList);
  console.log(tasksList)

  var sortedTaskList = tasksList;
  const compareDate = (a, b) => {
    var c = new Date(a.taskDeadline);
    var d = new Date(b.taskDeadline);
    // console.log(c)
    // console.log(d)
    if (c >= d) return 1;
    else return -1;
  };

  // console.log("yeah i am here")
  const sortTaskList = () => {
    sortedTaskList = tasksList.sort(compareDate);
  };
  console.log(sortedTaskList);

  tasksList && sortTaskList();
  const handledeadline = (due) => {
    var now = new Date();
    var due = new Date(due);
    if (due >= now) return 1;
    else return 0;
  };

  // console.log("i am pointing to here",tasksList)
  // console.log("i am now pointing to here", sortedTaskList)
  // console.log("i am seriously here", userInfo.taskAssignedIdList);
  const [showImg, setShowImg] = useState(false)
  // const taskImg = () => {
  // sortedTaskList && sortedTaskList.map((taskList) => {
  //   userInfo.taskAssignedIDList && userInfo.taskAssignedIDList.map((task) => {
  //     if (
  //       taskList.id === task &&
  //       handledeadline(taskList.taskDeadline) === 1 &&
  //       !taskList.taskCompletion
  //     ) {
  //       setShowImg(false);
  //     }
  //   });
  // });
  // }

  return (
    <>
      <div className={styles.upcomingTaskList}>
        {tasksList &&
          sortedTaskList.map((taskList) =>
            userInfo.taskAssignedIDList && userInfo.taskAssignedIdList.map(
              (task) =>
                taskList._id === task &&
                handledeadline(taskList.taskDeadline) === 1 &&
                !taskList.taskCompletion && (
                  <div className={styles.particularTask}>
                    <Link to="/task">
                      <div className={styles.projectDiv}>
                        <div className={styles.projectInfoName}>
                          <h4 className={styles.projectName}>
                            {taskList.taskName}
                          </h4>
                        </div>
                        <div className={styles.projectInfoLastUsed}>
                          <p className={styles.lastUsed}>
                            due: {taskList.taskDeadline}
                          </p>
                        </div>
                      </div>
                      {/* <h6 className={styles.particularTaskName}>
                        <div className={styles.taskName}>

                        </div>
                        <div className={styles.taskTime}>

                        </div>
                      </h6> */}
                    </Link>
                  </div>
                )
            )
          )}
        {showImg && (
          <div className={styles.mainTask}>
            <div className={styles.noTask}>
              <img
                className={styles.noTaskImg}
                src="https://www.linkpicture.com/q/list.png"
              ></img>
            </div>
            <div className={styles.noTaskText}>
              <p className={styles.upperTaskTxt}>You don't have</p>
              <p className={styles.lowerTaskTxt}> any Upcoming Task </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpcomingTask;
