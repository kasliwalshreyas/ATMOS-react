import React from 'react';
import styles from './TeamMemberCard.module.css';
import profileImage from "../../../images/logo192.png";



const TeamMemberCard = () => {
    return (
        <div className={styles.Card}>
            <div className={styles.CardImage}>
                <img className={styles.Image} src={profileImage} />
            </div>
            <div className={styles.CardInfo}>
                <div className={styles.InfoName}>
                    <p className={styles.para}>Shreyas Kasliwal</p>
                </div>
                <div className={styles.InfoRole}>
                    <p className={styles.para}>Project Manager</p>
                </div>
            </div>



        </div>
    );
}

export default TeamMemberCard;