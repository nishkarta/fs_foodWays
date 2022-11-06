import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { carts } from '../dataDummy/carts'
import map from '../images/map.png'
import bin from '../images/bin.png'
import MapEl from './MapEl';
import { CartContext } from './Contexts/CartContext';
import emptyImage from "../images/emptyImage.svg"
import convertRupiah from "rupiah-format";


import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useQuery } from 'react-query';
import { API } from '../config/api';
import { useNavigate } from 'react-router-dom';

function CartsEl() {
    const navigate = useNavigate()
    const { cartLength, setCartLength } = useContext(CartContext);

    const [showResponse, setShowResponse] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [latitudeNow, setLatitudeNow] = useState('')
    const [longitudeNow, setLongitudeNow] = useState('')

    // const [form, setForm] = useState({
    //     location: "",
    // });


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitudeNow(position.coords.latitude)
            setLongitudeNow(position.coords.longitude)
        })

    }, [])

    const position = [latitudeNow, longitudeNow];

    useEffect(() => {
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-XuvTZnVxV9tn-tIZ";

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);


    const addToCartHandler = async (productId, productPrice) => {
        try {
            const response = await API.post(`/cart/add/${productId}`, {
                price: productPrice
            })
            refetch();
            const getCart = await API.get('/carts')
            setCartLength(getCart.data.data.length)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteCartHandler = async (productId) => {
        try {
            const response = await API.patch(`/cart/update/${productId}`);
            if (response.data.data.qty === 0) {
                const response = await API.delete(`/cart/delete/${productId}`);
                setCartLength((prev) => prev - 1);
                console.log(response)
            }
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const { data: cartData, refetch } = useQuery('cartCache', async () => {
        try {
            const response = await API.get('/carts')
            return response.data.data
        } catch (err) {
            console.log(err)
        }
    })

    const allCartPrice = cartData?.map((item) => item.product.price * item.qty);
    const subTotal = allCartPrice?.reduce((a, b) => a + b, 0);
    const allQty = cartData?.map(p => p.qty).reduce((a, b) => a += b, 0)
    console.log(subTotal);

    const orderHandler = async () => {
        try {
            const response = await API.post('/transaction', {
                status: 'pending',
                qty: allQty,
                sellerId: cartData[0]?.product.user.id,
                totalPrice: subTotal,
            });

            // Insert transaction data

            const token = response.data.data.token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result);
                    navigate('/profile');
                },
                onPending: function (result) {
                    console.log(result);
                    navigate('/profile');
                },
                onError: function (result) {
                    console.log(result);
                },
                onClose: function () {
                    alert('you closed the popup without finishing the payment');
                },
            });
        } catch (err) {
            console.log(err)
        }
    };


    useEffect(() => {
        refetch()
    }, [])


    return (
        <div className="container-grey h-page">
            <Container className='p-5 ff-avenir'>
                <h3 className='mb-4 mt-3 ff-abhaya fw-extra-bold f-36 text-center text-lg-start'>Geprek Bensu</h3>
                <h5 className='text-lighter-brown mb-3 f-18'>Delivery Location</h5>
                <Form className='row mb-5'>
                    <Form.Group className="mb-3 col-12 col-lg-9">
                        <Form.Control value={position} type="text" placeholder="Enter location" className='p-2 border-0' />
                    </Form.Group>
                    <Form.Group className='col'>
                        <Button className='btn-full btn-brown p-2 mb-3 f-14 fw-extra-bold' onClick={() => setShowMap(true)}>
                            Select on Map <img src={map} alt='asfdfa'></img>
                        </Button>
                    </Form.Group>
                </Form>
                <h5 className='text-lighter-brown f-18'>Review Your Order</h5>

                <Row>
                    <Col className='col-lg-8'><hr /></Col>
                    <Col className='d-none d-lg-block'><hr /></Col>
                </Row>
                <Row className=''>

                    <Col>

                        {cartData?.length === 0 ? (
                            <Col className='d-flex flex-column justify-content-center align-items-center'>
                                <img alt="" src={emptyImage} width='200px' />
                                <h1>Whoops!!, You haven't ordered anything!! :( </h1>
                            </Col>
                        ) : (
                            cartData?.map((item) => (
                                <Col key={item.index}>
                                    <Row className='d-flex align-items-center'>

                                        <Col>
                                            <Row className='d-flex align-items-center text-start'>
                                                <Col className='col-3'>
                                                    <img src={`http://localhost:5000/uploads/${item.product.image}`} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                </Col>
                                                <Col className=' col-9 ps-5 ps-lg-0'>
                                                    <h6 className='my-3 ff-abhaya fw-extra-bold f-14'>{item.product.title}</h6>
                                                    <h6 className='my-3 ff-avenir'>
                                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                                            deleteCartHandler(item.product.id);
                                                        }} className='m-2 f-18'>
                                                            -
                                                        </span>
                                                        <button className='bg-rose border-0 rounded f-14'>
                                                            {item.qty}
                                                        </button>
                                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                                            addToCartHandler(
                                                                item.product.id,
                                                                item.product.price
                                                            );
                                                        }} className='m-2 f-18'>
                                                            +
                                                        </span>
                                                    </h6>

                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='col-4 text-end'>
                                            <h6 className='text-danger my-3 f-14'>{convertRupiah.convert(item.product.price * item.qty)}</h6>
                                            <h6 className='text-danger my-3'><img style={{ cursor: 'pointer' }} src={bin} alt="" onClick={async () => {
                                                const response = await API.delete(
                                                    `/cart/delete/${item.product.id}`
                                                );
                                                refetch();
                                                setCartLength((prev) => prev - 1);
                                            }} /></h6>
                                        </Col>
                                    </Row>
                                    <hr />
                                </Col>

                            ))
                        )}
                        {/* {

                            carts.map((prod, index) => (
                                <>
                                    <Col key={index}>
                                        <Row className='d-flex align-items-center'>

                                            <Col>
                                                <Row className='d-flex align-items-center text-start'>
                                                    <Col className='col-3'>
                                                        <img src={prod.image} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                    </Col>
                                                    <Col className=' col-9 ps-5 ps-lg-0'>
                                                        <h6 className='my-3 ff-abhaya fw-extra-bold f-14'>{prod.name}</h6>
                                                        <h6 className='my-3 ff-avenir'>
                                                            <span className='m-2 f-18'>
                                                                -
                                                            </span>
                                                            <button className='bg-rose border-0 rounded f-14'>
                                                                {prod.qty}
                                                            </button>
                                                            <span className='m-2 f-18'>
                                                                +
                                                            </span>
                                                        </h6>

                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className='col-4 text-end'>
                                                <h6 className='text-danger my-3 f-14'>{prod.price}</h6>
                                                <h6 className='text-danger my-3'><img src={bin} alt="" /></h6>
                                            </Col>
                                        </Row>
                                        <hr />
                                    </Col>

                                </>
                            ))} */}
                    </Col>
                    {cartData?.length > 0 && <Col className=' col-12 col-lg-4'>

                        <Col>
                            <Row className='d-flex align-items-center mt-2 f-14'>

                                <Col>
                                    <Row className='d-flex align-items-center text-start'>
                                        <Col className='ff-abhaya'>
                                            <h6 className='f-14'>Subtotal</h6>
                                        </Col>
                                        <Col className='col-4 text-end ff-avenir text-danger'><h6 className='f-14'>{convertRupiah.convert(subTotal)}</h6>
                                        </Col>
                                    </Row>
                                    <Row className='d-flex align-items-center text-start'>
                                        <Col className='ff-abhaya'>
                                            <h6 className='f-14'>Qty</h6>
                                        </Col>
                                        <Col className='col-4 text-end ff-avenir'><h6 className='f-14'>{allQty}</h6>
                                        </Col>
                                    </Row>
                                    <Row className='d-flex align-items-center text-start'>
                                        <Col className='ff-abhaya'>
                                            <h6 className='f-14'>Ongkir</h6>
                                        </Col>
                                        <Col className='col-4 text-end ff-avenir text-danger'><h6 className='f-14'>Rp 10.000</h6>
                                        </Col>
                                    </Row>
                                </Col>


                            </Row>
                            <hr />
                            <Col>
                                <Row className='d-flex align-items-center'>

                                    <Col>
                                        <Row className='d-flex align-items-center text-start text-danger'>
                                            <Col className='ff-abhaya'>
                                                <h6 className='f-14 fw-extra-bold'>Total</h6>
                                            </Col>
                                            <Col className='col-4 text-end ff-avenir '><h6 className='f-14 fw-extra-bold'>{convertRupiah.convert(10000 + subTotal)}</h6>
                                            </Col>
                                        </Row>
                                    </Col>


                                </Row>

                            </Col>
                            <Form.Group className="mt-5 pt-lg-5 float-end col-12 col-lg-8">
                                <Button type="button" className='btn-brown btn-full px-5 py-2 f-14 fw-extra-bold' onClick={orderHandler}>
                                    Order
                                </Button>
                            </Form.Group>

                        </Col>



                    </Col>
                    }
                </Row>
            </Container>

            <MapEl showMap={showMap} setShowMap={setShowMap} routing={true} partnerLocation={cartData && cartData[0]?.product?.user?.location} />

            <Modal show={showResponse} onHide={() => setShowResponse(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-yellow fs-1' >Congratulation!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Order Succedeed..
                </Modal.Body>
                <Modal.Footer>
                    <span className='fw-bold' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>back to home</span>
                </Modal.Footer>
            </Modal>

        </div >
    )
}

export default CartsEl