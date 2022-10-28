import React from "react";
import styles from "./CommentArena.module.css";
import CommentCard from "./CommentCard";
import profilePic from '../../../images/profilepic.png';


const CommentArena = ({ taskInfo, taskComment, setTaskComments }) => {
    return (
        <div className={styles.commentArena} >
            <div className={styles.commentList}>
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
            </div>

            <div className={styles.writingArena}>
                <div className={styles.writingInput}>
                    {/* <div className={styles.profileSection}>
                        <img className={styles.profilePicImg} src={profilePic} alt="profile" />
                    </div> */}
                    <div className={styles.commentInput}>
                        <textarea className={styles.commentInputText} placeholder="Write a comment..." rows={1} />
                    </div>
                </div>
                <div className={styles.commentButton}>
                    <button className={styles.commentButtonBtn}>Comment</button>
                </div>
            </div>

        </div>
    );
}

export default CommentArena;