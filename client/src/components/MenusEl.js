import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { CartContext } from './Contexts/CartContext';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import emptyImage from "../images/emptyImage.svg"
import convertRupiah from "rupiah-format";
import { useParams, useNavigate } from "react-router-dom"


function ProductCard({ item }) {
    return (

        <Card style={{ width: '100%' }} className="my-3 p-2">
            <Card.Img variant="top" style={{ width: '100%', height: '150px', objectFit: 'cover' }} src={item.image} className="mb-2" />

            <Card.Body className='p-0'>
                <Card.Title className='ff-abhaya f-18 fw-extra-bold'>{item.title}</Card.Title>
                <Card.Text className='text-danger f-14 ff-avenir'>
                    {convertRupiah.convert(item.price)}
                </Card.Text>
                <Button className='btn-full bg-yellow text-dark f-14 fw-extra-bold ff-avenir' >Order</Button>
            </Card.Body>

        </Card>

    )
}

function MenusEl() {

    const { cartCount, setCartCount } = useContext(CartContext)
    const params = useParams()
    const navigate = useNavigate()


    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get(`/products/${params.id ? params.id : user.id}`)
        return response.data.data
    })

    console.log(products)
    let { data: user } = useQuery('userCache', async () => {
        const response = await API.get(`/user/${params.id}`)
        return response.data.data
    })



    return (
        <div className="container-grey">
            <Container className='p-5'>
                <h3 className='mb-1 mt-3 ff-abhaya fw-extra-bold f-36 text-center text-lg-start'>{user?.fullName}</h3>
                <div className="d-flex">
                    <Row className="">
                        {products?.length !== 0 ? (
                            <>
                                {products?.map((item, index) => (
                                    <Col key={index}>
                                        <ProductCard item={item} />
                                    </Col>
                                ))}
                            </>
                        ) : (
                            <Col>
                                <div className="text-center pt-5">
                                    <img
                                        src={emptyImage}
                                        className="img-fluid"
                                        style={{ width: "40%" }}
                                        alt="empty"
                                    />
                                    <div className="mt-3">No data product</div>
                                </div>
                            </Col>
                        )}
                    </Row>

                </div>
            </Container>
        </div>

    )
}

export default MenusEl