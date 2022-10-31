import React from "react";
import styles from "./Sidebar.module.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.top}> 
            <span className={styles.logo}>Atmos</span>
            </div>
            <hr /> 
            <div className={styles.center}>
            <ul className={styles.list}>
                <p className={styles.title}>MAIN</p>
                <li className={styles.listItem}>
                <DashboardIcon className={styles.icon}/>
                <span className={styles.listItemIcon}>Dashboard</span>
                </li>
                <li className={styles.listItem}>
                <GroupIcon className={styles.icon}/>
                <span className={styles.listItemIcon}>Users</span>
                </li>
                <li className={styles.listItem}>
                <AccountTreeIcon className={styles.icon}/>
                <span className={styles.listItemIcon}>Projects</span>
                </li>
                <li className={styles.listItem}>
                <Diversity3Icon className={styles.icon}/>
                <span className={styles.listItemIcon}>Teams</span>
                </li>
                <p className={styles.title}>REPORTS</p>
                <li className={styles.listItem}>
                <QueryStatsIcon className={styles.icon}/>
                <span className={styles.listItemIcon}>Stats</span>
                </li>
                <li className={styles.listItem}>
                <CircleNotificationsIcon className={styles.icon}/>
                <span className={styles.listItemIcon}>Notificatons</span>
                </li>
                <li className={styles.listItem}>
                <SettingsIcon className={styles.icon}/>
                <span className={styles.listItemIcon}>Settings</span>
                </li>
                <p className={styles.title}>ACCOUNT</p>
                <li className={styles.listItem}>
                <AccountBoxIcon className={styles.icon}/>
                <span className={styles.listItemIcon}>Profile</span>
                </li>
                <li className={styles.listItem}>
                <LogoutIcon className={styles.icon}/>
                <span className={styles.listItemIcon}>Logout</span>
                </li>
            </ul>
            </div>
            {/* <div className={styles.bottom}>
                <div className={styles.colorOption}></div>
                <div className={styles.colorOption}></div>
                <div className={styles.colorOption}></div>
                <div className={styles.colorOption}></div>

            </div> */}
        </div>
    );
    }

export default Sidebar;