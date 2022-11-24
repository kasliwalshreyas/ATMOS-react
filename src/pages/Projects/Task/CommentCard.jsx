import React from "react";
import styles from "./CommentArena.module.css";
import profilePic from '../../../images/profilepic.png';

const CommentCard = ({ comment }) => {
    return (
        <div className={styles.commentCard}>
            <div className={styles.commentHeader}>
                <div className={styles.profileSection}>
                    <img className={styles.profilePicImg} src={profilePic} alt="profile" />
                </div>
                <div className={styles.commentInfo}>
                    <div className={styles.commenterName}>
                        <p>{comment.commenter}</p>
                    </div>
                    <div className={styles.commentDate}>
                        <p>6 hour</p>
                    </div>
                </div>
            </div>
            <div className={styles.commentBody}>
                <p>{comment.comment}</p>
            </div>
            <div className={styles.commentFooter}>
                {/* button for later purposes */}
            </div>
        </div>
    );
}

export default CommentCard;