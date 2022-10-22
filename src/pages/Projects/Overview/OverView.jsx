import React from "react"
import styles from './OverView.module.css';
import TeamMemberCard from "./TeamMemberCard";
import DescriptionComponent from "./DescriptionComponent";

const OverView = () => {
    return (
        <div className={styles.overviewMainView}>
            <div className={styles.descriptionArena}>
                <div className={styles.descriptionArenaHeading}>
                    <h3>About Project</h3>
                </div>
                <div className={styles.descriptionArenaDescription}>
                    <DescriptionComponent
                        heading="Project Statement"
                        description="Write about the purpose of the project."
                    />
                    <DescriptionComponent
                        heading="Project Mission"
                        description="Write about the mission of the project."
                    />
                    <DescriptionComponent
                        heading="Project Description"
                        description="Hello,
                        This is a project description.
                        This Project is named ATMOS.
                        ATMOS stands for Administrative Team Management and Organizational System."
                    />
                    <DescriptionComponent
                        heading="Project Guidelines"
                        description=" Write about the guidelines  of the project."
                    />

                </div>
            </div>
            <div className={styles.teamMembersArena}>
                <div className={styles.teamMembersHeading}>
                    <h3>Team Members</h3>
                </div>
                <div className={styles.teamMembersList}>
                    <TeamMemberCard />
                    <TeamMemberCard />
                    <TeamMemberCard />
                </div>
            </div>

        </div>
    );
}

export default OverView;