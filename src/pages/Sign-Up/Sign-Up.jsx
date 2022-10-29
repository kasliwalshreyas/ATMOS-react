import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardImg, Container } from "react-bootstrap";
import {Button} from "react-bootstrap";
import {FloatingLabel} from "react-bootstrap";
import { Form } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";  
// import Navbar from "../../UI/Navbar";

import './Sign-Up.css';

// For hashing the password before saving it to the json server
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [formValid, setFormValid] = useState(true);
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const isValidPassword = password => {
        const re = /^(?=.*[a-z])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(String(password));
    }

    const handleValidation = () => {
        let formIsValid = true;
        if(name.length < 3) {
            formIsValid = false;
            setFormValid(false);
             setNameError("Name should be atleast 3 characters long");
        }
        else{
            setNameError("");
            setFormValid(true);
        }
        if(!isValidPassword(password)) {
            formIsValid = false;
            setFormValid(false);
            setPasswordError("Password should be atleast 8 characters long and should contain atleast one lowercase letter");
        }
        else{
            setPasswordError("");
            setFormValid(true);
        }
        if(password !== confirmPassword) {
            formIsValid = false;
            setFormValid(false);
            setPasswordError("Passwords do not match");
        }
        else{
            setPasswordError("");
            setFormValid(true);
        }
        return formIsValid;
    }
    
    const handleSubmit =  (e) => {
        e.preventDefault();
        console.log("Form submitting...");
        console.log(handleValidation());
        if(handleValidation()) {    
            console.log("Form submitted");
            fetch("http://localhost:8000/userList", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({emailId: email, password: bcrypt.hashSync(password, salt), userName: name}),
            }).then(() => {
                navigate("/login");
            });
        }
    };

    return (
        <>
        {/* <Navbar /> */}
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" >
                        <Row>
                            <Col md={6} sm={12}>
                                <h2 className="text-center fw-bold">Sign Up</h2>
                                <Form onSubmit={handleSubmit}>
                                    <div className="mt-4 d-flex flex-row align-items-center">
                                        <i class="fa-solid fs-4 me-2 fa-user"></i>
                                        <FloatingLabel id="floatingInput" className=" w-100" label="Name">
                                            <Form.Control type="text" className="fs-5" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                        </FloatingLabel>
                                    </div>
                                   {!formValid && (<small id="nameHelp" className="text-danger ms-4 form-text">
                                            {nameError}
                                    </small>)}
                                    <div className="mt-3 d-flex flex-row align-items-center">
                                        <i class="fa-solid fs-4 me-2 fa-envelope"></i>
                                        <FloatingLabel id="floatingEmail" className="w-100" label="Email">
                                            <Form.Control type="email" className="fs-5" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                        </FloatingLabel>
                                        
                                    </div>
                                    <div className="mt-3 d-flex flex-row align-items-center">
                                        <i class="fa-solid fs-4 me-2 fa-lock"></i>
                                        <FloatingLabel id="floatingPassword" className="w-100" label="Password">
                                            <Form.Control type="password" className="fs-5" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                        </FloatingLabel>
                                        
                                    </div>
                                    {!formValid && (<small id="passwordHelp" className="text-danger ms-4 form-text">
                                            {passwordError}
                                    </small>)}
                                    <div className="mt-3 d-flex flex-row align-items-center">
                                        <i class="fa-solid fs-4 me-2 fa-key"></i>
                                        <FloatingLabel id="floatingConfirmPassword" className="w-100" label="Confirm Password">
                                            <Form.Control type="password" className="fs-5" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                                        </FloatingLabel>
                                    </div>
                                    <Button  className="w-100 btn-lg mt-5" type="submit">Sign Up</Button>
                                </Form>
                            </Col>
                            <Col md={6} sm={12} className="mt-4 d-flex align-items-center justify-content-center">
                                <CardImg src="./images/SignIn/SignIn.png" className="w-75" fluid />
                            </Col>
                        </Row>
            </div>
        </Container>
        </>
    );
}

export default SignUp;
