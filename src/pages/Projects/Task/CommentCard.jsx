import React from "react";
import styles from "./CommentArena.module.css";
import profilePic from '../../../images/profilepic.png';

const CommentCard = ({ }) => {
    return (
        <div className={styles.commentCard}>
            <div className={styles.commentHeader}>
                <div className={styles.profileSection}>
                    <img className={styles.profilePicImg} src={profilePic} alt="profile" />
                </div>
                <div className={styles.commentInfo}>
                    <div className={styles.commenterName}>
                        <p>John Doe</p>
                    </div>
                    <div className={styles.commentDate}>
                        <p>6 hour</p>
                    </div>
                </div>
            </div>
            <div className={styles.commentBody}>
                <p>Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.</p>
            </div>
            <div className={styles.commentFooter}>
                {/* button for later purposes */}
            </div>
        </div>
    );
}

export default CommentCard;