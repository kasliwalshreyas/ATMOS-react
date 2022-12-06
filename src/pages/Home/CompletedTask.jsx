import { useState } from "react";
import React from "react";
import useFetch from "../../useFetch";
import styles from "./CompletedTask.module.css";
import { Link } from "react-router-dom";
const CompletedTask = ({ user }) => {
  const [userInfo, setUserInfo] = useState(user);
  const {
    data: tasksList,
    isPending,
    error,
  } = useFetch("http://localhost:8000/taskList");

  console.log("hello i am here", tasksList)
  return (
    <>
      <div className={styles.completedTaskList}>
        {tasksList &&
          tasksList.map((taskList) =>
            userInfo.taskAssignedIDList.map(
              (task) =>
                taskList.id === task &&
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
      </div>
    </>
  );
};

export default CompletedTask;
