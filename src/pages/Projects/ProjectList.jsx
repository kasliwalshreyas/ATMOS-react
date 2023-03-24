import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createStyles, getStylesRef, Paper, Text, Title } from "@mantine/core";
import { IconHexagonLetterA, IconHexagonLetterP, IconPlus } from "@tabler/icons-react";


const colorCodes = [
  '#ff6b6b',
  "#f06595",
  '#cc5de8',
  '#845ef7',
  '#5c7cfa',
  '#4dabf7',
];



const useStyles = createStyles((theme) => ({
  projectContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    padding: theme.spacing.md,
  },
  projectBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    height: "fit-content",
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    // border: "1px solid black",
    borderRadius: theme.radius.md,
    transition: "transform 150ms ease, box-shadow 150ms ease",
    boxShadow: theme.shadows.lg,
    // backgroundColor: '#e7f5ff',
    // "&:hover": {
    //   transform: "scale(1.01)",
    //   boxShadow: theme.shadows.md,
    // },
    [`&:hover`]: {
      transform: 'scale(1.03)',
    },
  },


  plus: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    // backgroundColor: '#e7f5ff',
    // '&:hover': {
    //   transform: 'scale(1.01)',
    //   boxShadow: theme.shadows.md,
    // },
  },
  projectCard: {},

  iconPlus: {
    ref: getStylesRef('image'),
    height: "100%",
    width: "100%",
    // backgroundColor: colorCodes[],
  },

}));


const ProjectList = ({ projects, userInfo }) => {

  const { classes } = useStyles();
  const [user, setUser] = useState(userInfo);
  console.log(user, "user from project list");
  console.log(projects, "projects from project list");

  const handleLinkClick = async (project) => {
    // project.projectLastUsed &&
    //   project.projectLastUsed.map((lasttime) => {
    //     if (lasttime.userid === user._id) {
    //       lasttime.lastUsed = new Date();
    //     }
    //   });

    const res = await fetch(
      `http://localhost:4000/project/updateLastUsed/${project._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          updatedLastUsed: new Date(),
        })
      }
    );
    const data = await res.json();
  };

  const navigate = useNavigate();

  const insideProject = (project) => {
    handleLinkClick(project)
    navigate(`/projects/${project._id}/overview`);
  };

  return (
    <Paper p={20} sx={classes.projectContainer}>
      <Paper sx={classes.projectBox} withBorder bg={colorCodes[colorCodes.length - 1]} onClick={() => { navigate('/createproject') }}>
        <Paper sx={classes.plus} h={150} w={160} bg={colorCodes[colorCodes.length - 1]} px={10}>
          <IconPlus className={classes.iconPlus} color='white' />
        </Paper>
        <Text color='white'>Add Project</Text>
      </Paper>

      {/* <div className="plus-container">
        <Link className="plus" to="/createproject">
          +
        </Link>
      </div> */}
      {/* {console.log(projectList)} */}
      {projects &&
        projects
          .map((project, index) => (
            <Paper sx={classes.projectBox} onClick={() => { insideProject(project) }} key={index} bg={colorCodes[index]} withBorder>
              <Paper sx={classes.plus} h={150} w={160} bg={colorCodes[index]} px={10}>
                <IconHexagonLetterA color='white' className={classes.iconPlus} />
              </Paper>
              <Title color='white' order={4}>{project.projectName}</Title>
            </Paper>

          ))
          .reverse()}
    </Paper>
  );
};

export default ProjectList;

{/* <div className="project-real" key={project._id}>
              <div className="project-container">
                <a
                  onClick={() => {
                    insideProject(project);
                  }}
                >
                  <img
                    className="project-img"
                    src={`./images/img/img${1 % 10}.PNG`}
                  />
                </a>
              </div>
              <div className="project-name">
                {/* {console.log(project)} */}
                <p>{project.projectName}</p>
              </div>
            </div> */}