import React, { useEffect, useState } from "react";
import styles from "./OverView.module.css";
import TeamMemberCard from "./TeamMemberCard";
import DescriptionComponent from "./DescriptionComponent";


const OverView = ({ projectId, projectInfo, setProjectInfo }) => {
  // console.log(projectId);
  // console.log(projectInfo);
  const [projectName, setProjectName] = useState(projectInfo.projectName);
  const [projectStatement, setProjectStatement] = useState(projectInfo.projectStatement);
  const [projectMission, setProjectMission] = useState(projectInfo.projectMission);
  const [projectDescription, setProjectDescription] = useState(projectInfo.projectDescription);
  const [projectGuidelines, setProjectGuidelines] = useState(projectInfo.projectGuidelines);
  // const [projectTeam, setProjectTeam] = useState(projectInfo.projectTeam);


  return (
    <div className={styles.overviewMainView}>
      <div className={styles.descriptionArena}>
        <div className={styles.descriptionArenaHeading}>
          <h3>About Project</h3>
        </div>
        <div className={styles.descriptionArenaDescription}>
          <DescriptionComponent
            heading="Project Statement"
            description={projectStatement !== "" ? projectStatement : "What is your project about?"}
          />
          <DescriptionComponent
            heading="Project Mission"
            description={projectMission !== "" ? projectMission : "Write about the mission of your project"}
          />
          <DescriptionComponent
            heading="Project Description"
            description={projectDescription !== "" ? projectDescription : "Describe your project for your team mates."}
          />
          <DescriptionComponent
            heading="Project Guidelines"
            description={projectGuidelines !== "" ? projectGuidelines : "Share the guidelines of the project with your team mates."}
          />
        </div>
      </div>
      <div className={styles.teamMembersArena}>
        <div className={styles.teamMembersHeading}>
          <h3>Team Members</h3>
        </div>
        <div className={styles.teamMembersList}>
          <TeamMemberCard />
          <TeamMemberCard />
          <TeamMemberCard />
          <div className={styles.addMemberDiv}>
            <img className={styles.addMemberImg} src="https://img.icons8.com/sf-regular/48/000000/add.png" />
            <p className={styles.para}>Add Member</p>
          </div>

        </div>
      </div>
      <div className={styles.projectSettings}>
        <div className={styles.projectSettingHeading}>
          <h3>Settings</h3>
        </div>
        <div className={styles.projectSettingList}>
          <div className={styles.settingCard}>
            <div className={styles.settingInfoDiv}>
              <div className={styles.projectSettingInfoHead}>
                <p>Delete the project</p>
              </div>
              <div className={styles.projectSettingInfoBody}>
                <p>Once you delete a project, there is no going back. Please be certain.</p>
              </div>
            </div>
            <div className={styles.settingBtnDiv}>
              <button className={styles.settingBtn}>
                Delete this project
              </button>
            </div>
          </div>
          <div className={styles.settingCard}>
            <div className={styles.settingInfoDiv}>
              <div className={styles.projectSettingInfoHead}>
                <p>Transfer Ownership</p>
              </div>
              <div className={styles.projectSettingInfoBody}>
                <p>Transfer this project to another user or to an organization where you have the ability to create projects.</p>
              </div>
            </div>
            <div className={styles.settingBtnDiv}>
              <button className={styles.settingBtn}>
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OverView;
