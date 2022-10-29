import React from "react";
import styles from "./Priority.module.css";
import { useState } from "react";
import OverdueTask from "./OverdueTask";
import UpcomingTask from "./UpcomingTask";
import CompletedTask from "./CompletedTask";
const Priority = () => {
  const [taskType, setTaskType] = useState(1);

  const handletaskType = (value) => {
    setTaskType(value);
  };

  return (
    <>
      <div className={styles.listUsedTask}>
        <div className={styles.TaskHeaddiv}>
          <h4 className={styles.TaskHead}>My Priorities</h4>
          <div className={styles.checkTaskStatus}>
            <div
              onClick={() => {
                handletaskType(1);
              }}
              className={`${styles.checkTaskDifferentStatus}`}
            >
              Upcoming
            </div>
            <div
              onClick={() => {
                handletaskType(2);
              }}
              className={styles.checkTaskDifferentStatus}
            >
              Overdue
            </div>
            <div
              onClick={() => {
                handletaskType(3);
              }}
              className={styles.checkTaskDifferentStatus}
            >
              Completed
            </div>
          </div>
        </div>
        <div className={styles.taskContent}>
          {taskType === 1 && <UpcomingTask />}
          {taskType === 2 && <OverdueTask />}
          {taskType === 3 && <CompletedTask />}
        </div>
      </div>
    </>
  );
};

export default Priority;