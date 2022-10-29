import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rightdiv from "./Rightdiv";
import Navbar from "../../UI/Navbar";
import styles from "./CreateProject.module.css";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [type, setType] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [sectionIDList, setsectionIDList] = useState([]);
  const history = useNavigate();
  const [nextPage, setnextPage] = useState(1);
  const [projectStatement, setProjectStatement] = useState("");
  const [projectMission, setProjectMission] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGuidelines, setProjectGuidelines] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  let lastUsed;

  console.log(user);

  function backToHome() {
    setnextPage(1);
    history("/Projects");
  }

  const handleSubmit = (e) => {
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
    fetch("http://localhost:8000/projectList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    }).then(() => {
      setIsPending(false);
      setnextPage(1);
      console.log(nextPage);
      history("/Projects");
    });
  };

  const checkProjectName = () => {
    // console.log(e.target.value);
    let projectNameInput = document.getElementById("projectNameInput");
    if (projectNameInput.value === "") {
      projectNameInput.placeholder = "This field is required";
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
