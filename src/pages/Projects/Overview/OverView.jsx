import React, { useEffect, useState } from "react";
import styles from "./OverView.module.css";
import TeamMemberCard from "./TeamMemberCard";
import DescriptionComponent from "./DescriptionComponent";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
// import { setProject, addMediumTeamMember, addHightTeamMember, addLowTeamMember } from "../../../features/projectSlice";
import { useDispatch } from 'react-redux';
import { removeProjectFromFavourite, removeProjectFromUser } from "../../../features/userSlice";


const OverView = ({ projectId, projectInfo, setProjectInfo }) => {
  // console.log(projectId);

  // console.log(projectInfo);
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState(projectInfo.projectName);
  const [projectStatement, setProjectStatement] = useState(projectInfo.projectStatement);
  const [projectMission, setProjectMission] = useState(projectInfo.projectMission);
  const [projectDescription, setProjectDescription] = useState(projectInfo.projectDescription);
  const [projectGuidelines, setProjectGuidelines] = useState(projectInfo.projectGuidelines);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // const [taskList, setTaskList] = useState(null);
  // const [sectionList, setSectionList] = useState(null);




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
  const navigate = useNavigate();

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
    // size={'small'}
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
        // dispatch(addHightTeamMember(selectedTeamMember));
        projectInfo.highAccess.push(selectedTeamMember);
        projectInfoID.highAccess.push(selectedTeamMember.id);
      } else if (selectedRole.value === 'mediumAccess') {
        // dispatch(addMediumTeamMember(selectedTeamMember));
        projectInfo.mediumAccess.push(selectedTeamMember);
        projectInfoID.mediumAccess.push(selectedTeamMember.id);
      } else if (selectedRole.value === 'lowAccess') {
        // dispatch(addLowTeamMember(selectedTeamMember));
        projectInfo.lowAccess.push(selectedTeamMember);
        projectInfoID.lowAccess.push(selectedTeamMember.id);
      }
      // console.log(projectInfo, projectInfoID);

      // dispatch(setProject(projectInfo));
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

  async function deleteProjectFromUser(projectID, projectAssignee) {
    const res = await fetch(`http://localhost:8000/userList/${projectAssignee}`).then((response) => { return response.json() })
      .then((user) => {
        const projectList = user.projectIDList.filter((project) => {
          return project !== projectID;
        })
        user.projectIDList = projectList;
        dispatch(removeProjectFromUser(projectID));
        const favProjectList = user.favoriteProjectList.filter((project) => {
          return project !== projectID;
        })
        user.favoriteProjectList = favProjectList;

        let index = user.favoriteProjectList.indexOf(projectInfo.id);
        if (index > -1) {
          dispatch(removeProjectFromFavourite(index));

        }
        return user;
      })
      .then((user) => {
        return fetch(`http://localhost:8000/userList/${projectAssignee}`, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        })
      })
      .then((res) => {
        return res.json();
      }
      )
      .then((user) => {
        return user;
      }
      )
    console.log(res, 'deleted user data from DELETEPROJECTFROMUSER');
    return res;
  }

  async function deleteTaskFromUser(taskID, taskAssignee) {
    const res = await fetch(`http://localhost:8000/userList/${taskAssignee}`)
      .then((res) => { return res.json() })
      .then((AssigneeData) => {
        // const taskIDList = res2.taskIDList.filter((task) => { return !(task.id === taskID) });
        // const userData = { ...res2, taskIDList };
        // console.log(taskID);
        AssigneeData.taskAssignedIDList = AssigneeData.taskAssignedIDList.filter((taskid) => { return !(taskid === taskID) });
        console.log(AssigneeData);
        return fetch(`http://localhost:8000/userList/${taskAssignee}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(AssigneeData)
        })
          .then((user) => {
            console.log("Deleted Task from User");
            return user;
          });
      }
      )
    console.log(res, 'deleted user data from DELETETASKFROMUSER');
    return res;
  }

  async function deleteTask(taskID, assigneeID) {

    if (assigneeID) {
      const res1 = await deleteTaskFromUser(taskID, assigneeID);
    }

    const res = await fetch(`http://localhost:8000/taskList/${taskID}`, {
      method: 'DELETE'
    });
    console.log("deleted task", taskID);
    return res;
  }

  async function deleteSection(sectionID, sectionInfo) {

    //delete task inside section
    for (let i = 0; i < sectionInfo.taskIDList.length; i++) {
      // console.log("inside delete section", i);
      let res3 = await deleteTask(sectionInfo.taskIDList[i].id, sectionInfo.taskIDList[i].taskAssignee);
    }

    //delete section
    const res = await fetch(`http://localhost:8000/sectionList/${sectionID}`, {
      method: 'DELETE'
    })
      .then((res) => {
        console.log('Section Deleted');
        return res.json();
      });
    return res;
  }

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

  async function populateProjectInfo() {
    return fetch(`http://localhost:8000/sectionList?projectId_like=${projectId}`)
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
        // setTaskList(task);
        // setError(null);
        return [sec, task];
      })
      .then(([sec, task]) => {
        // console.log(sec, task);
        sec = populateTask(sec, task);
        // setSectionList(sec);
        // setError(null);
        return sec;
      })
      .catch((err) => {
        // setError(err.message);
        // setSectionList(null);
      });

  }


  const handleDeleteProject = async () => {

    console.log(projectInfo);

    const sec = await populateProjectInfo();
    console.log(sec, "sec");
    // console.log(taskList, 'tasklist');
    // console.log(sectionList, 'sec');


    // delete the task from of that project from task list

    // delete the section of that project from section list
    for (let i = 0; i < sec.length; i++) {
      // console.log("inside delete section", i);
      let res = await deleteSection(sec[i].id, sec[i]);
    }
    console.log("deleted all section");

    // delete the project from user's projectIDList
    for (let i = 0; i < projectInfo.highAccess.length; i++) {
      const res2 = await deleteProjectFromUser(projectInfo.id, projectInfo.highAccess[i].id);
    }
    for (let i = 0; i < projectInfo.mediumAccess.length; i++) {
      const res2 = await deleteProjectFromUser(projectInfo.id, projectInfo.mediumAccess[i].id);
    }
    for (let i = 0; i < projectInfo.lowAccess.length; i++) {
      const res2 = await deleteProjectFromUser(projectInfo.id, projectInfo.lowAccess[i].id);
    }

    console.log("deleted project from userList");

    // delete the project from project list
    const res = await fetch(`http://localhost:8000/projectList/${projectId}`, {
      method: 'DELETE'
    })
      .then((res) => {
        console.log('Project Deleted');
        return res.json();
      }
      )
      .then((data) => {
        console.log(data);
        navigate('/projects');
      }
      )
      .catch((err) => {
        console.log(err.message);
      }
      );
  }

  const handleTransfer = () => {
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
          {projectInfo.highAccess.map((member, index) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.emailId}
                key={index}
              // size={'large'}
              />
            )
          })}
          {projectInfo.mediumAccess.map((member, index) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.emailId}
                key={index}
              // size={'large'}
              />
            )
          })}
          {projectInfo.lowAccess.map((member, index) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.emailId}
                key={index}
              // size={'large'}
              />
            )
          })}
          <div className={styles.addMemberDiv} variant="primary" onClick={handleShow}>
            {/* <img className={styles.addMemberImg} src="https://img.icons8.com/sf-black-filled/64/000000/plus-math.png" /> */}
            {/* <img className={styles.addMemberImg} src="https://img.icons8.com/carbon-copy/100/000000/plus-2-math.png" /> */}
            {/* <img className={styles.addMemberImg} src="https://img.icons8.com/carbon-copy/100/000000/plus-2-math.png" /> */}
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
              <button className={styles.settingBtn} onClick={handleDeleteProject}>
                Delete this project
              </button>
            </div>
          </div>
          {/* <div className={styles.settingCard}>
            <div className={styles.settingInfoDiv}>
              <div className={styles.projectSettingInfoHead}>
                <p>Transfer Ownership</p>
              </div>
              <div className={styles.projectSettingInfoBody}>
                <p>Transfer this project to another user or to an organization where you have the ability to create projects.</p>
              </div>
            </div>
            <div className={styles.settingBtnDiv}>
              <button className={styles.settingBtn} onClick={handleTransfer}>
                Transfer
              </button>
            </div>
          </div> */}
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
