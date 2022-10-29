import React, { useContext, useState } from 'react'
import { Alert, Modal, Form, Button } from 'react-bootstrap'
import FormAll from '../components/Atoms/FormAll'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../components/Contexts/userContext';

import { useMutation } from 'react-query';

import { API } from '../config/api';

function LoginEl({ showLog, setShowLog, setShowReg }) {
    const navigate = useNavigate()
    const handleCloseLog = () => setShowLog(false);

    const title = 'Login'
    document.title = 'Foodways | ' + title

    const [dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const data = await API.post("/login", form);

            const alert = <Alert variant="success">Login Succeeded</Alert>;

            setMessage(alert);

            let payload = data.data.data;

            dispatch({
                type: "LOGIN_SUCCESS",
                payload,
            });

            navigate("/");

        } catch (err) {
            console.log(err);
            const alert = <Alert variant="danger">Wrong Email/Password</Alert>;

            setMessage(alert);
        }
    });

    // const [loggedInUser, setLoggedInUser] = useState({
    //     email: "",
    //     password: "",
    //     role: "",
    // });

    // const [statusMessage, setStatusMessage] = useState("");

    // function successLogin(email, password) {
    //     const emailCheck = User.filter((field) => field.email === email);

    //     if (emailCheck.length === 0) {
    //         setStatusMessage("Email is Not Registered");
    //         return {
    //             status: false,
    //             message: statusMessage,
    //         };
    //     }

    //     const result = User.filter((field) => field.password === password);

    //     if (result.length === 0) {
    //         setStatusMessage("Wrong Password");
    //         return {
    //             status: false,
    //             message: statusMessage,
    //         };
    //     }
    //     setStatusMessage("Login success");
    //     return {
    //         status: true,
    //         message: statusMessage,
    //         user: result[0],
    //     };
    // }


    return (
        <>

            <div className='loginModal'>
                <Modal show={showLog} onHide={handleCloseLog}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-yellow fs-1' >Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* {statusMessage !== "" &&
                            <p className={!isLoggedIn ? 'text-danger' : 'text-success'}>{statusMessage}</p>
                        } */}
                        {message && message}
                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <FormAll label='Email' type='email' placeholder='Email' className='mb-3 bg-grey2 text-grey2 border-grey2' name="email" value={email}
                                onChange={handleChange} />
                            <FormAll label='Password' type='password' placeholder='Password' className='mb-3 bg-grey2 text-grey2 border-grey2' value={password}
                                onChange={handleChange
                                } />

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button className='btn-full btn-brown p-3 fs-5 fw-bolder' variant="primary" >
                            Login
                        </Button>
                        <div className='btn-full justify-content-center d-flex'>
                            <div className='align-items-center'>
                                <p className=''>Don't have an account? Click<span className='ms-1 fw-bold' variant="" onClick={() => {
                                    setShowLog(false);
                                    setShowReg(true);
                                }} style={{ cursor: 'pointer' }}>
                                    Here
                                </span></p>
                            </div>
                        </div>

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default LoginEl