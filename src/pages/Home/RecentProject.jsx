import React, { useEffect, useState } from "react";
import styles from "./RecentProject.module.css";
import { Link } from "react-router-dom";

const RecentProject = ({ user }) => {
  const [showFavorite, setShowFavorite] = useState(false);
  const [projects, setProjects] = useState([]);

  // console.log("this is the only one of my favorite project from user defined object", user.favProjectIdList)

  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch("http://localhost:4000/project/getUserProjects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        // console.log(data.projects, "project data from recent project");
        setProjects(data.projects);
      }
    };
    getProjects();
  }, []);

  const handleChange = () => {
    if (showFavorite === false) setShowFavorite(true);
    else setShowFavorite(false);
  };

  function timeDiff(a, b) {
    var a_time, b_time;
    a.projectLastUsed &&
      a.projectLastUsed.map((lasttime) => {
        if (lasttime.userid === user._id) {
          a_time = lasttime.lastUsed;
        }
      });
    b.projectLastUsed &&
      b.projectLastUsed.map((lasttime) => {
        if (lasttime.userid === user._id) {
          b_time = lasttime.lastUsed;
        }
      });
    // console.log("here is the one ", b_time)
    // console.log("here is the another time", a_time)
    return b_time > a_time;
  }

  projects &&
    projects.sort((a, b) => {
      if (timeDiff(a, b) === true) return 1;
      else return -1;
    });

  function timeDiffNow(project, b) {
    var lasttimeused;
    project.projectLastUsed &&
      project.projectLastUsed.map((lasttime) => {
        if (lasttime.userid === user._id) {
          lasttimeused = lasttime.lastUsed;
        }
      });
    const c = new Date(lasttimeused);
    const d = new Date(b);
    const utc1 = Date.UTC(
      c.getFullYear(),
      c.getMonth(),
      c.getDate(),
      c.getHours(),
      c.getMinutes(),
      c.getSeconds()
    );
    const utc2 = Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    );
    return Math.floor(utc2 - utc1);
  }

  const late = [];
  let projectNumber = 0;
  projects &&
    projects.map((project) => {
      let now = new Date();
      let timeDivision = timeDiffNow(project, now) / 1000;
      if (timeDivision > 31536000) {
        late[projectNumber++] = -1;
      } else if (2678400 <= timeDivision) {
        timeDivision = Math.floor(timeDivision / 2678400);
        late[projectNumber++] = timeDivision + "mon ago";
      } else if (2678400 > timeDivision && timeDivision >= 86400) {
        timeDivision = Math.floor(timeDivision / 86400);
        late[projectNumber++] = timeDivision + "days ago";
      } else if (86400 > timeDivision && timeDivision >= 3600) {
        timeDivision = Math.floor(timeDivision / 3600);
        late[projectNumber++] = timeDivision + "h ago";
      } else if (3600 > timeDivision && timeDivision >= 60) {
        timeDivision = Math.floor(timeDivision / 60);
        late[projectNumber++] = timeDivision + "min ago";
      } else {
        late[projectNumber++] = Math.floor(timeDivision) + "s ago";
      }
    });

  projectNumber = 0;

  const handleLinkClick = async (projects, project) => {
    project.projectLastUsed &&
      project.projectLastUsed.map((lasttime) => {
        if (lasttime.userid === user._id) {
          lasttime.lastUsed = new Date();
        }
      });

    const res = await fetch(
      `http://localhost:4000/project/updateUserProjects/${project._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(project),
      }
    );
    const data = await res.json();
  };

  return (
    <>
      <div className={styles.listUsedProject}>
        <div className={styles.recentHeaddiv}>
          <h4 className={styles.projectHead}>
            Projects
            <select
              onChange={handleChange}
              className={styles.projectsCategory}
              name="projectcategory"
              id="projectCategory"
            >
              <option className={styles.projectsCategoryOption} value="recent">
                Recents
              </option>
              <option
                className={styles.projectsCategoryOption}
                value="favorite"
              >
                Favorites
              </option>
            </select>
          </h4>
        </div>

        {!showFavorite && (
          <div className={styles.recentListdiv}>
            {projects &&
              projects.map((project) => (
                <div className={styles.recentParticularProject}>
                  {
                    <Link
                      onClick={() => {
                        handleLinkClick(projects, project);
                      }}
                      to="/projects"
                    >
                      <div className={styles.projectDiv}>
                        <div className={styles.projectInfoName}>
                          <h4 className={styles.projectName}>
                            {project.projectName}
                          </h4>
                        </div>
                        <div className={styles.projectInfoLastUsed}>
                          <p className={styles.lastUsed}>
                            last used: {late[projectNumber++]}
                          </p>
                        </div>
                      </div>
                    </Link>
                  }
                </div>
              ))}

            {projects.length === 0 && (
              <div className={styles.mainFavorite}>
                <div className={styles.noFavorite}>
                  <img
                    className={styles.noFavoriteImgRecent}
                    src="https://www.linkpicture.com/q/project-management.png"
                    alt="No Recents"
                  ></img>
                </div>
                <div ClassName={styles.noFavoriteTxt}>
                  <p className={styles.upperFavoriteTxt}>You haven't started</p>
                  <p className={styles.lowerFavoriteTxt}> any Project yet</p>
                </div>
              </div>
            )}
          </div>
        )}

        {showFavorite && (
          <div className={styles.recentListdiv}>
            {projects &&
              user.favProjectIdList &&
              projects.map((project) =>
                user.favProjectIdList.map((userfavid) => {
                  if (userfavid === project._id) {
                    <div className={styles.recentParticularProject}>
                      {
                        <Link
                          onClick={() => {
                            handleLinkClick(projects, project);
                          }}
                          to="/projects"
                        >
                          <div className={styles.projectDiv}>
                            <div className={styles.projectInfoName}>
                              <h4 className={styles.projectName}>
                                {project.projectName}
                              </h4>
                            </div>
                            <div className={styles.projectInfoLastUsed}>
                              <p className={styles.lastUsed}>
                                last used: {late[projectNumber]}
                              </p>
                            </div>
                          </div>
                        </Link>
                      }
                    </div>;
                    {
                      projectNumber++;
                    }
                  }
                })
              )}

            {user.favProjectIdList.length === 0 && (
              <div className={styles.mainFavorite}>
                <div className={styles.noFavorite}>
                  <img
                    className={styles.noFavoriteImg}
                    src="https://www.linkpicture.com/q/favorites.png"
                    alt="No favorite"
                  ></img>
                </div>
                <div ClassName={styles.noFavoriteTxt}>
                  <p className={styles.upperFavoriteTxt}>You don't have any</p>
                  <p className={styles.lowerFavoriteTxt}>favorite project</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RecentProject;
