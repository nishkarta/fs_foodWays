import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import FormAll from './Atoms/FormAll'
import file from '../images/file.png'
import { useParams, useNavigate } from 'react-router-dom'
import { UserContext } from './Contexts/userContext'
import { useQuery } from 'react-query'

import { useMutation } from 'react-query'

import { API } from '../config/api'



function EditProduct() {
    const params = useParams()
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)

    const [preview, setPreview] = useState(null)

    const [form, setForm] = useState({
        title: "",
        image: "",
        price: "",
    });

    let { data: product } = useQuery("editProductCache", async () => {
        const response = await API.get("/product/" + params.id);
        return response.data.data;
    });

    useEffect(() => {
        if (product) {
            setPreview(product.image);
            setForm({
                ...form,
                title: product.title,
                price: product.price,
                qty: product.qty,
            });
            // setProduct(products);
        }

        // if (categoriesData) {
        //   setCategories(categoriesData);
        // }
    }, [product]);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const formData = new FormData();
            formData.set("title", form.title);
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("price", form.price);
            formData.set("qty", form.price);

            const response = await API.patch(`/product/${params.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            navigate(`/details/${state.user.id}`)

        } catch (err) {
            console.log(err)
        }
    })

    return (
        <div className="container-grey h-page">
            <Container className='p-5'>
                <h3 className='mt-3 mb-4 ff-abhaya f-36 fw-extra-bold text-center text-lg-start' >Edit Product</h3>
                <div className="">

                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Row>
                            <Col className='col-12 col-lg-9'>
                                <FormAll name="title" onChange={handleChange} value={form?.title} label="Title" type="text" placeholder="Title" className="mb-3 bg-grey2 border-grey3 text-avenir" />

                            </Col>
                            <Col>
                                <Form.Group className="mb-3 p-2 rounded bg-grey2 border-grey3" controlId="formBasicEmail" >
                                    {preview && (
                                        <div>
                                            <img
                                                src={preview}
                                                style={{
                                                    maxWidth: "150px",
                                                    maxHeight: "150px",
                                                    objectFit: "cover",
                                                }}
                                                alt={preview}
                                            />
                                        </div>
                                    )}
                                    <Form.Control name="image" onChange={handleChange} type="file" placeholder="Attach Image" hidden />
                                    <Form.Label className="d-flex justify-content-between btn-full align-items-center  ">
                                        <div className='text-grey3'>Attach Image </div>
                                        <div className=''>
                                            <img src={file} alt="" />
                                        </div>
                                    </Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>

                        <FormAll name="price" value={form?.price} onChange={handleChange} label="Price" type="text" placeholder="Price" className="mb-5 bg-grey2 border-grey3" />

                        <Form.Group className="mb-3 float-end col-3">
                            <Button type="submit" className='btn-brown btn-full px-5 py-2 f-14'>
                                Save
                            </Button>
                        </Form.Group>

                    </Form>
                </div>


            </Container >
        </div >

    )
}

export default EditProduct