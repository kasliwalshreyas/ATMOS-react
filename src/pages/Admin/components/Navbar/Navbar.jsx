import React from "react";
import styles from "./Navbar.module.css";
// import SearchOutlinedIcom from '@material-ui/icons/SearchOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.wrapper}>
                <div className={styles.search}>
                    <input type="text" placeholder="Search..."/>
                    <SearchIcon />
                </div>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <LanguageIcon className={styles.icon} />
                        English
                    </div>
                    <div className={styles.item}>
                        <DarkModeIcon className={styles.icon} />
                    </div>
                    <div className={styles.item}>
                        <CircleNotificationsIcon className={styles.icon} />
                        <div className={styles.counter}>1</div>
                    </div>
                    <div className={styles.item}>
                        <ChatBubbleOutlineIcon className={styles.icon} />
                        <div className={styles.counter}>2</div>
                    </div>
                    <div className={styles.item}>
                        <MenuIcon className={styles.icon} />
                    </div>
                    <div className="item">
                        <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className={styles.avatar} />
                    </div>
                </div>
            </div>
        </div>
    );
    }

export default Navbar;