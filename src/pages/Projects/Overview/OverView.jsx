import React, { useEffect, useState } from "react";
import styles from "./OverView.module.css";
import TeamMemberCard from "./TeamMemberCard";
import DescriptionComponent from "./DescriptionComponent";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const OverView = ({ projectId, projectInfo, setProjectInfo }) => {
  // console.log(projectId);
  // console.log(projectInfo);
  const [projectName, setProjectName] = useState(projectInfo.projectName);
  const [projectStatement, setProjectStatement] = useState(projectInfo.projectStatement);
  const [projectMission, setProjectMission] = useState(projectInfo.projectMission);
  const [projectDescription, setProjectDescription] = useState(projectInfo.projectDescription);
  const [projectGuidelines, setProjectGuidelines] = useState(projectInfo.projectGuidelines);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  // const [projectTeam, setProjectTeam] = useState(projectInfo.projectTeam);

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/userList/")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUserList(res);
      });
  }, []);

  // console.log(userList)


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const options = userList.filter((user) => {
    let flag = !projectInfo.highAccess.find((member) => {
      return member.id === user.id;
    });
    flag = flag && !projectInfo.mediumAccess.find((member) => {
      return member.id === user.id;
    }
    );
    flag = flag && !projectInfo.lowAccess.find((member) => {
      return member.id === user.id;
    }
    );
    return flag;
  });


  const options2 = [{
    value: 'highAccess',
    label: 'High'
  }, {
    value: 'mediumAccess',
    label: 'Medium'
  }, {
    value: 'lowAccess',
    label: 'Low'
  }]

  const formatOptionLabel = ({ userName, emailId, id }) => (
    <TeamMemberCard
      name={userName}
      email={emailId}
      size={'small'}
    />
  );

  const addTeamMember = () => {
    // console.log(selectedTeamMember, selectedRole);
    // console.log(projectInfo);
    if (selectedTeamMember && selectedRole) {
      const projectInfoID = JSON.parse(JSON.stringify(projectInfo));

      for (let i = 0; i < projectInfoID.highAccess.length; i++) {
        projectInfoID.highAccess[i] = projectInfo.highAccess[i].id;
      }
      for (let i = 0; i < projectInfoID.mediumAccess.length; i++) {
        projectInfoID.mediumAccess[i] = projectInfo.mediumAccess[i].id;
      }
      for (let i = 0; i < projectInfoID.lowAccess.length; i++) {
        projectInfoID.lowAccess[i] = projectInfo.lowAccess[i].id;
      }

      selectedTeamMember.projectIDList.push(projectId);

      if (selectedRole.value === 'highAccess') {
        projectInfo.highAccess.push(selectedTeamMember);
        projectInfoID.highAccess.push(selectedTeamMember.id);
      } else if (selectedRole.value === 'mediumAccess') {
        projectInfo.mediumAccess.push(selectedTeamMember);
        projectInfoID.mediumAccess.push(selectedTeamMember.id);
      } else if (selectedRole.value === 'lowAccess') {
        projectInfo.lowAccess.push(selectedTeamMember);
        projectInfoID.lowAccess.push(selectedTeamMember.id);
      }
      // console.log(projectInfo, projectInfoID);

      setProjectInfo(projectInfo);
      // add user to project
      fetch(`http://localhost:8000/projectList/${projectId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectInfoID)
      })
        .then((res) => {
          return res.json();
        })
        .then(async (project) => {
          //add project to user
          const res = await fetch(`http://localhost:8000/userList/${selectedTeamMember.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedTeamMember)
          })
          return project;
        })
        .then((project) => {
          // console.log(project);
          console.log('new team member added');
          // setProjectInfo(project);
        })
    }

    handleClose();

  }
  const handleMemberChange = (option) => {
    // console.log(option);
    setSelectedTeamMember(option);
  }
  const handleRoleChange = (option) => {
    // console.log(option);
    setSelectedRole(option);
  }


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
          {console.log(projectInfo)}
          {projectInfo.highAccess.map((member) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.emailId}
              // size={'large'}
              />
            )
          })}
          {projectInfo.mediumAccess.map((member) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.emailId}
              // size={'large'}
              />
            )
          })}
          {projectInfo.lowAccess.map((member) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.emailId}
              // size={'large'}
              />
            )
          })}
          <div className={styles.addMemberDiv} variant="primary" onClick={handleShow}>
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
      <Modal
        className={styles.modalStyle}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Select
            placeholder="Search for a team member"
            formatOptionLabel={formatOptionLabel}
            options={options}
            isSearchable={false}
            onChange={handleMemberChange}
            styles={{
              option: (provided, state) => ({
                ...provided,
                // border: '1px solid #ccc',

                backgroundColor: state.isSelected ? 'gray' : 'white',
                backgroundColor: state.isFocused ? 'lightgray' : 'white',
                backgroundColor: state.isClicked ? 'lightgray' : 'white',
                ':active': {
                  backgroundColor: state.isSelected ? 'lightgray' : 'white',
                  // border: '1px solid #ccc'
                },
                padding: 10
              }),
              control: (provided, state) => ({
                ...provided,
                border: '1px solid #ccc',
                borderRadius: 0,
                width: '400px',
                boxShadow: 'none',
                ':hover': {
                  border: '1px solid #ccc'
                }
              }),
              container: (provided, state) => ({
                ...provided,
                display: 'inline-flex',
                flexDirection: 'row',
                marginRight: 20
              })

            }}
          />
          <Select
            placeholder="Select a role"
            // formatOptionLabel={formatOptionLabel}
            options={options2}
            isSearchable={false}
            onChange={handleRoleChange}
            styles={{
              option: (provided, state) => ({
                ...provided,
                // border: '1px solid #ccc',

                backgroundColor: state.isSelected ? 'gray' : 'white',
                backgroundColor: state.isFocused ? 'lightgray' : 'white',
                backgroundColor: state.isClicked ? 'lightgray' : 'white',
                ':active': {
                  backgroundColor: state.isSelected ? 'lightgray' : 'white',
                  // border: '1px solid #ccc'
                },
                padding: 10
              }),
              control: (provided, state) => ({
                ...provided,
                border: '1px solid #ccc',
                borderRadius: 0,
                width: '400px',
                boxShadow: 'none',
                ':hover': {
                  border: '1px solid #ccc'
                }
              }),
              container: (provided, state) => ({
                ...provided,
                display: 'inline-flex',
                flexDirection: 'row',
                width: '150px'
              })
            }}


          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addTeamMember}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OverView;
