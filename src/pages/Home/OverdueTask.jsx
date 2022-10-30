import React from "react";
import { useState } from "react";
import useFetch from "../../useFetch";
import styles from "./OverdueTask.module.css";
import { Link } from "react-router-dom";
const OverdueTask = ({ user }) => {
  const [userInfo, setUserInfo] = useState(user);
  const { data: tasksList, isPending, error } = useFetch(
    "http://localhost:8000/taskList"
  );

  var sortedTaskList = tasksList;
  const compareDate = (a, b) => {
    var c = new Date(a.taskDeadline);
    var d = new Date(b.taskDeadline);
    if (c >= d) return 1;
    else return -1;
  };

  const sortTaskList = () => {
    sortedTaskList = tasksList.sort(compareDate);
  };

  tasksList && sortTaskList();
  const handledeadline = (due) => {
    var now = new Date();
    var due = new Date(due);
    if (due < now) return 1;
    else return 0;
  };
  return (
    <>
      <div className={styles.completedTaskList}>
        {tasksList &&
          tasksList.map((taskList) =>
            userInfo.taskAssignedIDList.map(
              (task) =>
                taskList.id === task &&
                handledeadline(taskList.taskDeadline) === 1 && !taskList.taskCompletion && (
                  <div className={styles.particularTask}>
                    <Link to="/task">
                      <div className={styles.projectDiv}>
                        <div className={styles.projectInfoName}>
                          <h4 className={styles.projectName}>
                            {taskList.taskName}
                          </h4>
                        </div>
                        <div className={styles.projectInfoLastUsed}>
                          <p className={styles.lastUsed}>due: {taskList.taskDeadline}</p>
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

export default OverdueTask;
