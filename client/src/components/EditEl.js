import React, {useState} from 'react'
import { Container, Form, Row, Col, Button, Modal } from 'react-bootstrap'
import map from '../images/map.png'
import file from '../images/file.png'
import FormAll from './Atoms/FormAll'
import myloc from '../images/myloc.png'
import {  useNavigate } from 'react-router-dom'

function EditEl() {
    const [showLoc, setShowLoc] = useState(false)
    const handleShowLoc = () => {
        setShowLoc(true)
    }
    const handleCloseLoc = () => {
        setShowLoc(false)
    }

    const navigate = useNavigate()

    return (
        <div className="container-grey h-page">
            <Container className='p-5 '>
                <div className='mt-3'>
                    <h3 className='mb-4 ff-abhaya fw-extra-bold f-36 text-center text-lg-start'>Edit Profile</h3>


                    <Form>
                        <Row>
                            <Col className='col-12 col-lg-9'>
                                <FormAll label="Full Name" type="text" placeholder="Full Name" className="mb-3  bg-grey2 border-grey3" />
                            </Col>
                            <Col>
                                <Form.Group className="mb-3 p-1 rounded  bg-grey2 border-grey3" controlId="formBasicEmail" >
                                    <Form.Control type="file" placeholder="Attach Image" hidden />
                                    <Form.Label className="d-flex justify-content-between btn-full align-items-center p-1">
                                        <div className=''>Attach Image </div>
                                        <div className=''>
                                            <img src={file} alt="" />
                                        </div>
                                    </Form.Label>
                                </Form.Group>
                            </Col>


                        </Row>

                        <FormAll label="Email" type="email" placeholder="Email" className="mb-3 bg-grey2 border-grey3" />
                        <FormAll label="Phone" type="tel" placeholder="Phone" className="mb-3 bg-grey2 border-grey3" />

                        <Row className="mb-5">
                            <Col className='col-12 col-md-8 col-lg-9'>
                                <FormAll label="Location" type="text" placeholder="Location" className="mb-3 bg-grey2 border-grey3" />
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Button type="button" className='btn-brown btn-full p-3 ff-avenir f-14 d-none d-md-block' onClick={handleShowLoc}>
                                        Select on Map <img src={map} alt='asfdfa'></img>
                                    </Button>

                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3 float-md-end col-12 col-md-3">
                            <Button type="button" className='btn-brown btn-full px-5 py-2 ff-avenir f-14' onClick={()=> navigate('/profile')}>
                                Save
                            </Button>
                        </Form.Group>

                    </Form>
                    <div className="locationModal">
                    <Modal show={showLoc} onHide={handleCloseLoc} size='xl' centered
 >
        
                        <Modal.Header closeButton>
                        
                        </Modal.Header>
                        <Modal.Body>
                              <img src={myloc} alt='' style={{width:'100%'}} />
                        </Modal.Body>
                    </Modal>
                </div>


                </div>
            </Container>

        </div >

    )
}

export default EditEl