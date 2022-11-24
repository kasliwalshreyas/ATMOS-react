import React from "react";
import styles from "./DescriptionComponent.module.css";

const DescriptionComponent = ({ heading, description }) => {
    return (
        <div className={styles.descriptionComponent}>
            <div className={styles.dropdown}>
                <p className={styles.dropdownDots}>...</p>
                <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownOption}>Remove</div>
                </div>
            </div>

            <label className={styles.projectDescriptionLabel}>{heading}</label>
            <textarea className={styles.projectDescriptionTextArea} value={description} readOnly></textarea>
        </div>
    );
}

export default DescriptionComponent;