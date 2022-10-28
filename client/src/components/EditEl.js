import React, { useState, useContext, useEffect } from 'react'
import { Container, Form, Row, Col, Button, Modal } from 'react-bootstrap'
import map from '../images/map.png'
import file from '../images/file.png'
import FormAll from './Atoms/FormAll'
import myloc from '../images/myloc.png'
import { useNavigate } from 'react-router-dom'
import { API } from '../config/api'
import { UserContext } from './Contexts/userContext'
import { useQuery } from 'react-query'

function EditEl() {
    const [state, dispatch] = useContext(UserContext)
    const [preview, setPreview] = useState(null)
    const [showLoc, setShowLoc] = useState(false)
    const handleShowLoc = () => {
        setShowLoc(true)
    }
    const handleCloseLoc = () => {
        setShowLoc(false)
    }
    console.log("state edit product", state)

    const navigate = useNavigate()

    const [form, setForm] = useState({
        fullName: "",
        image: "",
        email: "",
        phone: "",
        location: "",
    });

    let { data: user } = useQuery("userEditCache", async () => {
        const response = await API.get(`user/${state.user.id}`);
        return response.data.data;
    });

    console.log("ini data edit profile", user)
    useEffect(() => {
        if (user) {
            setPreview(user.image);
            setForm({
                ...form,
                fullName: user.fullNname,
                email: user.email,
                phone: user.phone,
                location: user.location,
            });
        }

    }, [user]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            // Store data with FormData as object
            const formData = new FormData();
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name);
            }
            formData.set("fullName", form.fullName);
            formData.set("email", form.email);
            formData.set("phone", form.phone);
            formData.set("location", form.location);

            // Insert product data
            const response = await API.patch("/user/" + user.id, formData);

            console.log("ini data updated user", response.data);

            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="container-grey h-page">
            <Container className='p-5 '>
                <div className='mt-3'>
                    <h3 className='mb-4 ff-abhaya fw-extra-bold f-36 text-center text-lg-start'>Edit Profile</h3>


                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Row>
                            <Col className='col-12 col-lg-9'>
                                <FormAll name="fullName" onChange={handleChange} label="Full Name" type="text" placeholder="Full Name" className="mb-3  bg-grey2 border-grey3" />
                            </Col>
                            <Col>
                                <Form.Group className="mb-3 p-1 rounded  bg-grey2 border-grey3" controlId="formBasicEmail" >
                                    {preview && (
                                        <div>
                                            <img
                                                src={preview}
                                                style={{
                                                    maxWidth: "150px",
                                                    maxHeight: "150px",
                                                    objectFit: "cover",
                                                }}
                                                alt="preview"
                                            />
                                        </div>
                                    )}
                                    <Form.Control name="image" onChange={handleChange} type="file" placeholder="Attach Image" hidden />
                                    <Form.Label className="d-flex justify-content-between btn-full align-items-center p-1">
                                        <div className=''>Attach Image </div>
                                        <div className=''>
                                            <img src={file} alt="" />
                                        </div>
                                    </Form.Label>
                                </Form.Group>
                            </Col>


                        </Row>

                        <FormAll name="email" onChange={handleChange} label="Email" type="email" placeholder="Email" className="mb-3 bg-grey2 border-grey3" />
                        <FormAll name="phone" onChange={handleChange} label="Phone" type="tel" placeholder="Phone" className="mb-3 bg-grey2 border-grey3" />

                        <Row className="mb-5">
                            <Col className='col-12 col-md-8 col-lg-9'>
                                <FormAll name="location" onChange={handleChange} label="Location" type="text" placeholder="Location" className="mb-3 bg-grey2 border-grey3" />
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
                            <Button type="submit" className='btn-brown btn-full px-5 py-2 ff-avenir f-14'>
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
                                <img src={myloc} alt='' style={{ width: '100%' }} />
                            </Modal.Body>
                        </Modal>
                    </div>


                </div>
            </Container>

        </div >

    )
}

export default EditEl