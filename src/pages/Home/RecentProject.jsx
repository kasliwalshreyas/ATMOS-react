import React, { useEffect, useState } from "react";
import styles from "./RecentProject.module.css";
import useFetch from "../../useFetch";
import { Link } from "react-router-dom";

const RecentProject = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showFavorite, setShowFavorite] = useState(false);
  const { data: projects, isPending, error } = useFetch(
    "http://localhost:8000/projectList"
  );

  const handleChange = () => {
    if (showFavorite === false) setShowFavorite(true);
    else setShowFavorite(false);
  };

  function timeDiff(a, b) {
    const c = new Date(a.lastUsed);
    const d = new Date(b.lastUsed);
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
  projects &&
    projects.sort((a, b) => {
      if (timeDiff(a, b) > 0) return 1;
      else return -1;
    });

  function timeDiffNow(a, b) {
    const c = new Date(a.lastUsed);
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
  projects &&
    projects.map((project) => {
      let now = new Date();
      let timeDivision = timeDiffNow(project, now) / 1000;
      if (timeDivision > 31536000) {
        late[project.id - 1] = -1;
      } else if (2678400 <= timeDivision) {
        timeDivision = Math.floor(timeDivision / 2678400);
        late[project.id - 1] = timeDivision + "mon ago";
      } else if (2678400 > timeDivision && timeDivision >= 86400) {
        timeDivision = Math.floor(timeDivision / 86400);
        late[project.id - 1] = timeDivision + "days ago";
      } else if (86400 > timeDivision && timeDivision >= 3600) {
        timeDivision = Math.floor(timeDivision / 3600);
        late[project.id - 1] = timeDivision + "h ago";
      } else if (3600 > timeDivision && timeDivision >= 60) {
        timeDivision = Math.floor(timeDivision / 60);
        late[project.id - 1] = timeDivision + "min ago";
      } else {
        late[project.id - 1] = Math.floor(timeDivision) + "s ago";
      }
    });

  const handleLinkClick = (project) => {
    project.lastUsed = new Date();
    localStorage.setItem("projectId", project.id);
    fetch(`http://localhost:8000/projectList/${project.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    }).then((result) => {
      return result.json();
    });
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
            {projects && console.log(projects, 'from recent')}
            {projects &&
              user.projectIDList.length !== 0 &&
              projects.map((project) =>
                user.projectIDList.map(
                  (projectid) =>
                    projectid === project.id && (
                      <div className={styles.recentParticularProject}>
                        {late[project.id - 1] !== -1 && (
                          <Link
                            onClick={() => {
                              handleLinkClick(project);
                            }}
                            to="/task/overview"
                          >
                            <h6 className={styles.particularProjectName}>
                              <div className={styles.lastUsedName}>
                                {project.projectName}
                              </div>
                              <div className={styles.lastUsedTime}>
                                last used: {late[project.id - 1]}
                              </div>
                            </h6>
                          </Link>
                        )}
                      </div>
                    )
                )
              )}

            {user.projectIDList.length === 0 && (
              <div>
                <div className={styles.noFavorite}>
                  You haven't started any Project yet.
                </div>
              </div>
            )}
          </div>
        )}

        {showFavorite && (
          <div className={styles.recentListdiv}>
            {projects &&
              user.favoriteProjectList &&
              projects.map((project) =>
                user.favoriteProjectList.map(
                  (favorite) =>
                    project.id === favorite && (
                      <div className={styles.recentParticularProject}>
                        {
                          <Link
                            onClick={() => {
                              handleLinkClick(project);
                            }}
                            to="/task/overview"
                          >
                            <h6 className={styles.particularProjectName}>
                              <div className={styles.lastUsedName}>
                                {project.projectName}
                              </div>
                              <div className={styles.lastUsedTime}>
                                last used: {late[project.id - 1]}
                              </div>
                            </h6>
                          </Link>
                        }
                      </div>
                    )
                )
              )}
            {user.favoriteProjectList.length === 0 && (
              <div>
                <div className={styles.noFavorite}>
                  You don't have any favorite project
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
