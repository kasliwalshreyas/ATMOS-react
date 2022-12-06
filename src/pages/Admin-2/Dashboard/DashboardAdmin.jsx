import React, {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'react-admin';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import styles from "./DashboardAdmin.module.css";


const DashboardAdmin = () => {
    const [projects, setProjects] = useState(null);
    const [users, setUsers] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [sections, setSections] = useState(null);

    useEffect(() => {
        async function getLengths() {
            const res = await fetch("http://localhost:8000/projectList");
            const userRes = await fetch("http://localhost:8000/userList");
            const taskRes = await fetch("http://localhost:8000/taskList");
            const sectionRes = await fetch("http://localhost:8000/sectionList");
            const data = await res.json();
            const userData = await userRes.json();
            const taskData = await taskRes.json();
            const sectionData = await sectionRes.json();
            setProjects(data.length);
            setUsers(userData.length);
            setTasks(taskData.length);
            setSections(sectionData.length);
        }
        getLengths();
    }, []);

    return (
    <>
        <Title title="ATMOS-Admin" />
        <Card className="mt-3 shadow align-items-center" >
            <CardContent>
                <h1 className="fw-semibold text-center" style={{ color: "#06407a" }}>ATMOS Admin</h1>
                <p className="fw-semibold text-center" style={{ color: "#85bff9" }}>Welcome to the ATMOS Administator Portal</p>
            </CardContent>
        </Card>
        <Row className=" mt-3 mb-3">
                        <Col md={6}>
                            <div className={styles.countContainer}>
                                <div className={styles.containerHead}>
                                    <div className={styles.headIcon}><img src="https://img.icons8.com/ios-glyphs/30/000000/to-do.png" /></div>

                                    <div className={styles.headText}>Users</div>
                                </div>
                                <div className={styles.containerBody}>
                                    <p className={styles.para}>
                                    {users? users:"0"}
                                    </p>
                                </div>
                                <div className={styles.containerFoot}>
                                    <p className={styles.para}>
                                    TOTAL USERS
                                    </p>
                                </div>
                            </div>
                            
                        </Col>
                        <Col md={6}>
                            <div className={styles.countContainer}>
                                    <div className={styles.containerHead}>
                                        <div className={styles.headIcon}><i className="fa-solid fa-star"></i></div>

                                        <div className={styles.headText}>Projects</div>
                                    </div>
                                    <div className={styles.containerBody}>
                                        <p className={styles.para}>
                                        {projects? projects:"0"}
                                        </p>
                                    </div>
                                    <div className={styles.containerFoot}>
                                        <p className={styles.para}>
                                        TOTAL PROJECTS
                                        </p>
                                    </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className={styles.countContainer}>
                                    <div className={styles.containerHead}>
                                        <div className={styles.headIcon}><i className="fa-solid fa-bars-progress"></i></div>

                                        <div className={styles.headText}>Tasks</div>
                                    </div>
                                    <div className={styles.containerBody}>
                                        <p className={styles.para}>
                                        {tasks? tasks:"0"}
                                        </p>
                                    </div>
                                    <div className={styles.containerFoot}>
                                            <p className={styles.para}>
                                                TOTAL TASKS
                                            </p>
                                    </div>
                                </div>
                        </Col>
                        <Col md={6}>
                                <div className={styles.countContainer}>
                                    <div className={styles.containerHead}>
                                        <div className={styles.headIcon}><i className="fa-solid fa-bars-progress"></i></div>

                                        <div className={styles.headText}>Sections</div>
                                    </div>
                                    <div className={styles.containerBody}>
                                        <p className={styles.para}>
                                        {sections? sections:"0"}
                                        </p>
                                    </div>
                                    <div className={styles.containerFoot}>
                                        <p className={styles.para}>
                                            TOTAL SECTIONS
                                        </p>
                                    </div>
                                </div>
                        </Col>
                    </Row>

    </>
    );
};

export default DashboardAdmin;