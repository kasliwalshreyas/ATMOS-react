import React from "react";
import styles from "./Widget.module.css";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonIcon from '@mui/icons-material/Person';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Widget = ({type}) => {
    let data;
    switch (type) {
        case "Users":
            data = {
                title: "USERS",
                value: 400,
                icon: <PersonIcon className={styles.icon}  style={{color: "green", backgroundColor:"lightgreen"}}/>,
                color: "#f5b7b1",
                percentage: 10,
                percentageIcon: <ExpandLessIcon style={{color: "green"}} />,
                percentageColor: "#f5b7b1",
                class: "percentageP",
                line: "See All Users",
            };
            break;
        case "Projects":
            data = {
                title: "PROJECTS",
                value: 705,
                icon: <AccountTreeIcon className={styles.icon}  style={{color: "red", backgroundColor:"lightpink"}}/>,
                color: "#f5b7b1",
                percentage: 8,
                class: "percentageN",
                percentageIcon: <ExpandLessIcon style={{color: "green"}} />,                percentageColor: "",
                line: "See All Projects",
            };
            break;
        case "Teams":
            data = {
                title: "TEAMS",
                value: 100,
                icon: <Diversity3Icon className={styles.icon}  style={{color: "blue", backgroundColor:"lightskyblue"}}/>,
                color: "#f5b7b1",
                percentage: 18, 
                class: "percentageP",
                percentageIcon: <ExpandLessIcon style={{color: "green"}} />,
                percentageColor: "#f5b7b1",
                line: "See All Teams",
            };
            break;
        case "Revenue":
            data = {
                title: "REVENUE",
                value: 2300,
                icon: <ShoppingCartIcon className={styles.icon}  style={{color: "yellow", backgroundColor:"lightyellow"}} />,
                color: "#f5b7b1",
                class: "percentageP",
                percentage: 20,
                percentageIcon: <ExpandLessIcon style={{color: "green"}} />,
                percentageColor: "#f5b7b1",
                line: "See Details",
            };
            break;
        default:
            break;
    }


    return (
        <div className={styles.widget}>
            <div className={styles.left}>
                <span className={styles.title}>{data.title}</span>
                <span className={styles.counter}>{data.value}</span>
                <span className={styles.link}>{data.line}</span>
            </div>
            <div className={styles.right}>
                <div className={styles.percentage} style={{color: "green"}}>
                    {data.percentage}%
                    {data.percentageIcon}
                </div>
                {data.icon}
            </div>
        </div>
    );
    }  

export default Widget;