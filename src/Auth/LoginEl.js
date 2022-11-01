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



    const [state, dispatch] = useContext(UserContext);

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
            setShowLog(false)

        } catch (err) {
            console.log(err);
            const alert = <Alert variant="danger">Wrong Email/Password</Alert>;

            setMessage(alert);
        }
    });

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
                            <FormAll required label='Email' type='email' placeholder='Email' className='mb-3 bg-grey2 text-grey2 border-grey2' name="email" value={email} onChange={handleChange} />
                            <FormAll required label='Password' type='password' placeholder='Password' className='mb-3 bg-grey2 text-grey2 border-grey2' name="password" value={password}
                                onChange={handleChange
                                } />


                            <Button type="submit" className='btn-full btn-brown p-3 fs-5 fw-bolder' variant="primary" >
                                Login
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

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