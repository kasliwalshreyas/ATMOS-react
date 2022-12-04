import React from "react";
import { useState } from "react";
import { CardImg, Card, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import bcrypt from "bcryptjs";   // For hashing the password before saving it to the json server

import styles from "./ProfileSection.module.css";

const ProfileSection = ({ user }) => {
    const [userName, setUserName] = useState(user.userName);
    const [emailId, setemailId] = useState(user.emailId);
    const [password, setPassword] = useState(user.password);
    console.log(user, 'from profile section');

    const [isEdit, setIsEdit] = useState(false);

    // const handleEdit = () => {
    //     setIsEdit(true);
    // }

    const salt = bcrypt.genSaltSync(10);

    const handleClick = () => {
        console.log(isEdit);
        let hashedPassword = password;
        if (isEdit) {
            if (password !== user.password) {
                hashedPassword = bcrypt.hashSync(password, salt);
            }
            const updatedUser = { ...user, userName, emailId, password: hashedPassword };
            fetch("http://localhost:8000/userList/" + user.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            }).then(() => {
                setIsEdit(false);
            });
        }
        // setIsEdit(!isEdit);
    }

    return (
        <>
            <Container className="profile-container mt-3" >
                <Card className="profile-card" style={{ backgroundColor: "#f5f5f5" }}>
                    <Card.Body className="d-flex align-items-center justify-content-between">
                        <h1 className="profile-heading fw-semibold" style={{ color: "#05386B" }}>Profile</h1>
                        <div>
<<<<<<< HEAD
                            <Button variant="info" className="edit-button" onClick={!isEdit ? () => setIsEdit(!isEdit) : handleClick}>{isEdit ? <i className="fa-solid fa-floppy-disk"></i> : <i className="fa-solid fa-pen"></i>}</Button>
=======
                            <Button variant="info" className="edit-button" onClick={!isEdit?()=> setIsEdit(!isEdit):handleClick}>{isEdit ? <i className="fa-solid fa-floppy-disk"></i> : <i className="fa-solid fa-pen"></i>}</Button>
>>>>>>> 8708e00 (Login and some changes ui)
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Container className="profile-container mt-3">
                <Row>
                    <Col md={4} sm={12} className="mb-3">
                        <Card className={styles.profileCard+ ` shadow`}>
                            <Card.Body className="text-center">
                                <CardImg src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    className="rounded-circle fluid"
                                    style={{ width: '150px' }}
                                />

<<<<<<< HEAD
                                <h1 className="profile-heading fw-semibold mt-3" style={{ color: "#05386B" }}>{userName}</h1>
                                <p className="profile-para text-secondary">{emailId}</p>
=======
                                <h1 className="profile-heading fw-semibold mt-3" style={{color:"#05386B"}}>{userName}</h1>
                                <p className="profile-para fw-bold text-secondary">{emailId}</p>
>>>>>>> 8708e00 (Login and some changes ui)
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8} sm={12}>
<<<<<<< HEAD
                        <Card className="profile-card shadow">
                            <Card.Body className="profile-card-body">
                                <Row className="mb-3">
                                    <Form.Label column className="fw-semibold" lg={2}>
                                        Username
                                    </Form.Label>
                                    <Col className="text-center">
                                        {isEdit &&
                                            <Form.Control type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} disabled={!isEdit} />
                                        }
                                        {!isEdit &&
                                            <div className="text-dark border-bottom border-dark border-opacity-50 fs-5">{userName}</div>
                                        }
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Label column className="fw-semibold" lg={2}>
                                        Email
                                    </Form.Label>
                                    <Col className="text-center">
                                        {isEdit &&
                                            <Form.Control type="email" placeholder="Email" value={emailId} onChange={(e) => setemailId(e.target.value)} disabled={!isEdit} />
                                        }
                                        {!isEdit &&
                                            <div className="text-dark border-bottom border-dark border-opacity-50 fs-5">{emailId}</div>
                                        }
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Label column className="fw-semibold" lg={2}>
                                        Password
                                    </Form.Label>
                                    <Col className="text-center">
                                        {isEdit &&
                                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isEdit} />
                                        }
                                        {!isEdit &&
                                            <div className="text-dark border-bottom border-dark border-opacity-50 fs-4">....................</div>
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Row className=" mt-3 mb-3">
                            <Col md={4}>
                                <div className={styles.countContainer}>
                                    <div className={styles.containerHead}>
                                        <div className={styles.headIcon}><img src="https://img.icons8.com/ios-glyphs/30/000000/to-do.png" /></div>

                                        <div className={styles.headText}>Projects</div>
                                    </div>
                                    <div className={styles.containerBody}>
                                        <p className={styles.para}>
                                            {user.projectIDList ? user.projectIDList.length : "0"}
                                        </p>
                                    </div>
                                    <div className={styles.containerFoot}>
                                        <p className={styles.para}>
                                            TOTAL PROJECTS
                                        </p>
                                    </div>
                                </div>

                            </Col>
                            <Col md={4}>
                                <div className={styles.countContainer}>
                                    <div className={styles.containerHead}>
                                        <div className={styles.headIcon}><i className="fa-solid fa-star"></i></div>

                                        <div className={styles.headText}>Favourites</div>
                                    </div>
                                    <div className={styles.containerBody}>
                                        <p className={styles.para}>
                                            {user.favoriteProjectList ? user.favoriteProjectList.length : "0"}
                                        </p>
                                    </div>
                                    <div className={styles.containerFoot}>
                                        <p className={styles.para}>
                                            TOTAL FAVOURITES
                                        </p>
                                    </div>
=======
                        <Card className={`shadow `+ styles.profileCard}>
                        <Card.Body className="profile-card-body">
                                    <Row className="mb-3">
                                        <Form.Label column className="fw-semibold" lg={2}>
                                                Username
                                            </Form.Label>
                                            <Col className="text-center">
                                                {isEdit && 
                                                    <Form.Control type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} disabled={!isEdit} />
                                                }
                                                {!isEdit &&
                                                    <div className=" fw-bold border-bottom border-dark border-opacity-50 fs-5" style={{color:"#05386B"}}>{userName}</div>
                                                }
                                            </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Label column className="fw-semibold" lg={2}>
                                            Email
                                        </Form.Label>
                                        <Col className="text-center">
                                            {isEdit &&
                                                <Form.Control type="email" placeholder="Email" value={emailId} onChange={(e) => setemailId(e.target.value)} disabled={!isEdit} />
                                            }
                                            {!isEdit &&
                                                <div className="fw-bold border-bottom border-dark border-opacity-50 fs-5" style={{color:"#05386B"}}>{emailId}</div>
                                            }
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Label column className="fw-semibold" lg={2}>
                                            Password
                                        </Form.Label>
                                        <Col className="text-center">
                                            {isEdit &&
                                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isEdit} />
                                            }
                                            {!isEdit &&
                                                <div className="fw-bold border-bottom border-dark border-opacity-50 fs-4" style={{color:"#05386B"}}>....................</div>
                                            }
                                        </Col>
                                    </Row>
                            </Card.Body>
                        </Card>
                        <Row className=" mt-3 mb-3">
                        <Col md={4}>
                            <div className={styles.countContainer}>
                                <div className={styles.containerHead}>
                                    <div className={styles.headIcon}><img src="https://img.icons8.com/ios-glyphs/30/000000/to-do.png" /></div>

                                    <div className={styles.headText}>Projects</div>
                                </div>
                                <div className={styles.containerBody}>
                                    <p className={styles.para}>
                                    {user.projectIDList? user.projectIDList.length:"0"}
                                    </p>
                                </div>
                                <div className={styles.containerFoot}>
                                    <p className={styles.para}>
                                    TOTAL PROJECTS
                                    </p>
                                </div>
                            </div>
                            
                        </Col>
                        <Col md={4}>
                        <div className={styles.countContainer}>
                                <div className={styles.containerHead}>
                                    <div className={styles.headIcon}><i className="fa-solid fa-star"></i></div>

                                    <div className={styles.headText}>Favourites</div>
                                </div>
                                <div className={styles.containerBody}>
                                    <p className={styles.para}>
                                    {user.favoriteProjectList? user.favoriteProjectList.length:"0"}
                                    </p>
                                </div>
                                <div className={styles.containerFoot}>
                                    <p className={styles.para}>
                                    TOTAL FAVOURITES
                                    </p>
                                </div>
                            </div>
                            
                        </Col>
                        <Col md={4}>
                        <div className={styles.countContainer}>
                                <div className={styles.containerHead}>
                                    <div className={styles.headIcon}><i className="fa-solid fa-bars-progress"></i></div>

                                    <div className={styles.headText}>Tasks</div>
                                </div>
                                <div className={styles.containerBody}>
                                    <p className={styles.para}>
                                    {user.taskAssignedIDList? user.taskAssignedIDList.length:"0"}
                                    </p>
>>>>>>> 8708e00 (Login and some changes ui)
                                </div>

                            </Col>
                            <Col md={4}>
                                <div className={styles.countContainer}>
                                    <div className={styles.containerHead}>
                                        <div className={styles.headIcon}><i className="fa-solid fa-bars-progress"></i></div>

                                        <div className={styles.headText}>Tasks</div>
                                    </div>
                                    <div className={styles.containerBody}>
                                        <p className={styles.para}>
                                            {user.taskAssignedIDList ? user.taskAssignedIDList.length : "0"}
                                        </p>
                                    </div>
                                    <div className={styles.containerFoot}>
                                        <p className={styles.para}>
                                            TOTAL TASKS
                                        </p>
                                    </div>
                                </div>
                            </Col>

                        </Row>

                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default ProfileSection;

