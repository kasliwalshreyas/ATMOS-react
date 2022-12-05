import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rightdiv from "./Rightdiv";
import Navbar from "../../UI/Navbar";
import styles from "./CreateProject.module.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProjectToUser } from "../../features/userSlice";

const CreateProject = () => {

  // const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState(null);
  // useEffect(() => {

  //   async function getUser() {
  //     const res = await fetch("http://localhost:8000/userList/" + userID);
  //     const data = await res.json();
  //     setUser(data);
  //   }
  //   getUser();
  // }, [userID]);

  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [projectName, setProjectName] = useState("");
  const [type, setType] = useState("");
  const [projectStatement, setProjectStatement] = useState("");
  const [projectMission, setProjectMission] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGuidelines, setProjectGuidelines] = useState("");
  const [sectionIDList, setsectionIDList] = useState([]);

  const [isPending, setIsPending] = useState(false);
  const [nextPage, setnextPage] = useState(1);
  let lastUsed;

  console.log(user, 'user from create project');

  function backToHome() {
    setnextPage(1);
    history("/Projects");
  }

  const handleSubmit = async (e) => {
    lastUsed = new Date();
    e.preventDefault();
    const project = {
      projectName,
      type,
      sectionIDList,
      projectStatement,
      projectMission,
      projectDescription,
      lastUsed,
      projectGuidelines,
      userId: user.id,
      highAccess: [user.id],
      mediumAccess: [],
      lowAccess: [],
    };
    setIsPending(true);

    const newProjectInfo = await fetch("http://localhost:8000/projectList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    }).then(res => {
      return res.json();
    }).
      then(data => {
        dispatch(addProjectToUser(data.id));
        setIsPending(false);
        setnextPage(1);
        history("/projects");
        return data;
      });
    console.log(newProjectInfo, 'newProjectInfo');



    // console.log('create project user', userInfo);

    // const res2 = await fetch(`http://localhost:8000/userList/${newProjectInfo.userId}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(user),
    // }).then((res) => {
    //   setIsPending(false);
    //   setnextPage(1);
    //   history("/projects");
    //   return res.json();
    // });
    // console.log(res2, 'userInfo');

    // localStorage.setItem("user", JSON.stringify(userInfo));

  };

  const checkProjectName = () => {
    // console.log(e.target.value);
    let projectNameInput = document.getElementById("projectNameInput");
    if (projectNameInput.value === "") {
      projectNameInput.placeholder = "This field is required";
      projectNameInput.style.border = "1px solid red";
      projectNameInput.style.backgroundColor = "#FFCCCB";
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.createProject}>
        <div className={styles.projectLeftPart}>
          <div className={styles.leftFix}>
            <div className={styles.projectLeftUpperPart}>
              <div className={styles.projectLeftUpperLeftPart}>
                {nextPage === 1 && (
                  <h1 className="new-project-head">New Project</h1>
                )}
                {nextPage !== 1 && (
                  <h1 className="new-project-head">{projectName}</h1>
                )}
              </div>
              <div className={styles.projectLeftUpperRightPart}>
                <h1>{nextPage}/5</h1>
              </div>
            </div>

            <div className={styles.projectLeftMiddlePart}>
              {nextPage === 1 && (
                <form>
                  <label>Project name</label>
                  <input
                    id="projectNameInput"
                    placeholder="Name"
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <label>Project type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Personal">Personal</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                  </select>
                </form>
              )}

              {nextPage === 2 && (
                <form onSubmit={handleSubmit}>
                  <label>Project Statement</label>
                  <textarea
                    className={styles.textareaInput}
                    placeholder="Write about the purpose of the project."
                    type="text"
                    value={projectStatement}
                    onChange={(e) => setProjectStatement(e.target.value)}
                  />
                </form>
              )}

              {nextPage === 3 && (
                <form onSubmit={handleSubmit}>
                  <label>Project Mission</label>
                  <textarea
                    placeholder="Write about the mission of the project."
                    className={styles.textareaInput}
                    type="text"
                    value={projectMission}
                    onChange={(e) => setProjectMission(e.target.value)}
                  />
                </form>
              )}

              {nextPage === 4 && (
                <form>
                  <label>Project Description</label>
                  <textarea
                    placeholder=" Give the Description about the project."
                    className={styles.textareaInput}
                    type="text"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </form>
              )}

              {nextPage === 5 && (
                <form>
                  <label>Project Guidlines</label>
                  <textarea
                    placeholder=" Write about the guidelines of the project."
                    className={styles.textareaInput}
                    type="text"
                    value={projectGuidelines}
                    onChange={(e) => setProjectGuidelines(e.target.value)}
                  />
                </form>
              )}
            </div>

            <div className={styles.projectToggles}>
              {nextPage === 1 && <button onClick={backToHome}>Back</button>}
              {nextPage >= 2 && nextPage <= 5 && (
                <button
                  onClick={() => {
                    setnextPage(nextPage - 1);
                  }}
                >
                  Back
                </button>
              )}
              {console.log(projectName)}
              {nextPage >= 1 && nextPage <= 4 && (
                <button
                  onClick={() => {
                    projectName === "" && checkProjectName();
                    projectName !== "" && setnextPage(nextPage + 1);
                  }}
                >
                  Next
                </button>
              )}
              {nextPage === 5 && setIsPending && (
                <button onClick={handleSubmit}>Setup Project</button>
              )}
              {nextPage === 5 && !setIsPending && (
                <button disabled>Adding Project...</button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.createProjectRight}>
          <Rightdiv />
        </div>
      </div>
    </>
  );
};

export default CreateProject;
