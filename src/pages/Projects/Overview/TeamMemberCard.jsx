import React from 'react';
import styles from './TeamMemberCard.module.css';
import profileImage from "../../../images/logo192.png";



const TeamMemberCard = ({ name, email, role }) => {
    // console.log(name);
    return (
        <div className={styles.Card}>
            <div className={styles.CardImage}>
                <img className={styles.Image} src={profileImage} />
            </div>
            <div className={styles.CardInfo}>
                <div className={styles.InfoName}>
                    <p className={styles.para}>{name}</p>
                </div>
                {role && (<div className={styles.InfoRole}>
                    <p className={styles.para}>Project Manager</p>
                </div>)}
                {email && (<div className={styles.InfoEmail}>
                    <p className={styles.para}>{email}</p>
                </div>)}
            </div>
        </div>
    );
}

export default TeamMemberCard;