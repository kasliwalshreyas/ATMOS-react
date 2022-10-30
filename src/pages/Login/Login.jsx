import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import styles from './Login.module.css';
// import useFetch from "../../useFetch";
import bcrypt from "bcryptjs";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        fetch('http://localhost:8000/userList?emailId=' + email, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    alert("User does not exist!");
                }
                else {
                    console.log(data);
                    if (bcrypt.compareSync(password, data[0].password)) {
                        localStorage.setItem("user", JSON.stringify(data[0].id));
                        navigate('/home');
                    }
                    else {
                        alert("Incorrect password!");
                    }
                }
            })
    };

    return (
        <Container className={styles.container}>
            <Row className={styles.row}>
                <Col xs={12} md={5} lg={6} className="d-flex flex-column justify-content-center align-items-center">
                    <h1 className="my-3 ms-1 display-3 fw-bold ls-tight px-3">
                        The best offer <br />
                        <span className="text-primary">to grow your<br /> business</span>
                    </h1>
                    <p className="my-3 mx-5 fs-5 px-5 text-secondary">
                        Collaborate better with <span className="fw-bold text-primary">ATMOS</span>, the best platform to manage your business.
                        Manage resources, simplify workflows, and plan with confidence no matter your industry.
                        Track your progress and get the most out of your business.
                        So, what are you waiting for? Sign up now!
                    </p>
                </Col>
                <Col xs={12} md={7} lg={6} className="d-flex flex-column justify-content-center align-items-center">
                    <Card className="shadow w-75 h-100 p-5 ">
                        <h2 className="text-center fw-bold">Login</h2>
                        <Form className="mt-4" onSubmit={handleSubmit}>
                            <div className="mt-4 d-flex flex-row align-items-center">
                                <i class="fa-solid fs-4 me-2 fa-envelope"></i>
                                <FloatingLabel controlId="floatingInput" label="Email" className="w-100">
                                    <Form.Control type="email" className="fs-5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </FloatingLabel>
                            </div>
                            <div className="mt-4 d-flex flex-row align-items-center">
                                <i class="fa-solid fs-4 me-2 fa-lock"></i>
                                <FloatingLabel controlId="floatingPassword" className="w-100" label="Password">
                                    <Form.Control type="password" placeholder="Password" className="fs-5" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="mt-4 d-flex flex-row align-items-center">
                                <Button className="w-100 btn-lg" variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                            <p className="mt-2 text-secondary text-end">
                                Don't have an account? <Link to="/signup" className="text-decoration-none text-primary">Register here</Link>
                            </p>
                            <div class="d-flex justify-content-center">
                                <Link to="#" class="small text-secondary text-decoration-none me-5">Terms of use</Link>
                                <Link to="#" class="small text-secondary text-decoration-none">Privacy policy</Link>
                            </div>
                            <div class="mt-4 mb-0">
                                <p class="m-0 text-center text-secondary">
                                    © 2022 ATMOS. All rights reserved.
                                </p>
                            </div>
                        </Form>
                    </Card>
                </Col>

            </Row>

        </Container>
    );
}

export default Login;