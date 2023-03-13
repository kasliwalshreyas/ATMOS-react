import { useState } from "react";
import React from "react";
import useFetch from "../../useFetch";
import styles from "./CompletedTask.module.css";
import { Link } from "react-router-dom";
const CompletedTask = ({ user }) => {
  const [userInfo, setUserInfo] = useState(user);
  // const {
  //   data: tasksList,
  //   isPending,
  //   error,
  // } = useFetch("http://localhost:8000/taskList");

  const [tasksList, setTasksList] = useState(user.taskAssignedIdList);

  const [showImg, setShowImg] = useState(false);
  // tasksList && tasksList.map((taskList) => {
  //   userInfo.taskAssignedIDList && userInfo.taskAssignedIDList.map((task) => {
  //     if (taskList.id === task && taskList.taskCompletion) {
  //       setShowImg(false);
  //     }
  //   });
  // });

  // console.log("hello i am here", tasksList)
  return (
    <>
      <div className={styles.completedTaskList}>
        {tasksList &&
          tasksList.map((taskList) =>
            userInfo.taskAssignedIDList && userInfo.taskAssignedIdList.map(
              (task) =>
                taskList._id === task &&
                taskList.taskCompletion && (
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

export default CompletedTask;
