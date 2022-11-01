import React, { useState } from 'react'
import { Modal, Form, Button, FloatingLabel, Alert } from 'react-bootstrap'
import FormAll from '../components/Atoms/FormAll'

import { useMutation } from "react-query"
import { API } from '../config/api'
// import { useNavigate } from 'react-router-dom'

// import { UserContext } from '../components/Contexts/userContext'


function RegisterEl({ showReg, setShowReg, showLog, setShowLog }) {
    // let navigate = useNavigate()
    const handleCloseReg = () => setShowReg(false);


    // const [state, dispatch] = useContext(UserContext)

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        role: "",
    });


    const { fullName, email, password, phone, gender, role } = form


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,

        });
    };


    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const response = await API.post("/register", form)

            const alert = (
                <Alert variant="success">Registration Succeeded</Alert>
            )

            setMessage(alert);

            setShowReg(false)
            setShowLog(true)
        } catch (err) {
            console.log(err);
            const alert = (
                <Alert variant="danger">Registration Failed</Alert>
            );

            setMessage(alert);
        }
    })



    return (
        <div className='registerModal'>
            <Modal show={showReg} onHide={handleCloseReg}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-yellow fs-1' >Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>


                        <FormAll required onChange={handleChange} name="fullName" value={fullName} label="Full Name" type="text" placeholder="Full Name" className="mb-3 bg-grey2 text-grey2 border-grey2" />
                        <FormAll required onChange={handleChange} name="email" value={email} label="Email" type="email" placeholder="Email" className="mb-3 bg-grey2 text-grey2 border-grey2" />
                        <FormAll onChange={handleChange} name="password" value={password} label="Password" type="password" placeholder="Password" className="mb-3 bg-grey2 text-grey2 border-grey2" />


                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <FloatingLabel label='Gender'>
                                <Form.Select required onChange={handleChange} name="gender" value={gender} aria-label="Default select example" className='bg-grey2 text-grey2 border-grey2'>
                                    <option hidden selected >Select Gender</option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                    <option value="o">Other</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>

                        <FormAll name="phone" value={phone} onChange={handleChange} label="Phone" type="tel" placeholder="Phone" className="mb-3 bg-grey2 text-grey2 border-grey2" />



                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <FloatingLabel label='User Type'>
                                <Form.Select required name="role" value={role} onChange={handleChange} aria-label="Default select example" className='bg-grey2 text-grey2 border-grey2'>
                                    <option hidden selected >Select User Type</option>
                                    <option value="cust">As Customer</option>
                                    <option value="adm">As Partner</option>

                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>

                        <Button type="submit" className='btn-full btn-brown p-3 fs-5 fw-bolder'>
                            Register
                        </Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <div className='btn-full justify-content-center d-flex'>
                        <div className='align-items-center'>
                            <p className=''>Already have an account? Click
                                <span className='ms-1 fw-bold' variant="" onClick={() => {
                                    setShowReg(false)
                                    setShowLog(true)
                                }} style={{ cursor: 'pointer' }}>
                                    Here
                                </span></p>
                        </div>
                    </div>

                </Modal.Footer>

            </Modal>

        </div>

    )
}

export default RegisterEl