import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import emptyImage from "../images/emptyImage.svg"
import convertRupiah from "rupiah-format";
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from './Contexts/userContext';
import { CartContext } from './Contexts/CartContext';


function ProductCard({ item }) {

    const [state] = useContext(UserContext)
    const { cartData, setCartData } = useContext(CartContext);
    const { cartLength, setCartLength } = useContext(CartContext);

    const navigate = useNavigate()
    const addToCartHandler = async (productId, productPrice) => {
        try {
            const response = await API.post(`/cart/add/${productId}`, {
                price: productPrice,
            });
            const getCart = await API.get('/carts');
            setCartLength(getCart.data.data.length);
        } catch (error) {
            console.log(error);
        }
    };


    // let { prodId } = useParams()
    let api = API()

    let { data: product, refetch } = useQuery("Cache", async () => {

        const response = await API.get("/product/" + item.id)
        console.log(item.id)
        console.log(response.data.data)
        return response.data.data
    })

    // const handleBuy = useMutation(async () => {
    //     try {
    //         const data = {
    //             productId: product.id,
    //             sellerId: product.user.id,
    //             price: product.price,
    //         }

    //         const response = await api.post('/transaction')

    //         const token = response.data.token


    //     } catch (err) {
    //         console.log(err)
    //     }
    // })


    return (

        <Card style={{ width: '13rem' }} className="my-3 p-2">
            <Card.Img variant="top" style={{ width: '100%', height: '150px', objectFit: 'cover' }} src={item.image} className="mb-2" />

            <Card.Body className='p-0'>
                <Card.Title className='ff-abhaya f-18 fw-extra-bold'>{item.title}</Card.Title>
                <Card.Text className='text-danger f-14 ff-avenir'>
                    {convertRupiah.convert(item.price)}
                </Card.Text>
                {state.user.role === "cust" ? <Button className='btn-full bg-yellow text-dark f-14 fw-extra-bold ff-avenir' onClick={() => addToCartHandler(item.id, item.price)}>Order</Button> : <Button onClick={() => navigate(`/edit-product/${item.id}`)} className='btn-full bg-yellow text-dark f-14 fw-extra-bold ff-avenir' >Edit Product</Button>}

            </Card.Body>

        </Card>

    )
}

function MenusEl() {
    const [state] = useContext(UserContext)

    const params = useParams()
    const navigate = useNavigate()


    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get(`/products/${params.id ? params.id : state.user.id}`)
        return response.data.data
    })

    let { data: user } = useQuery('userCache', async () => {
        const response = await API.get(`/user/${params.id ? params.id : state.user.id}`)
        return response.data.data
    })


    return (
        <div className="container-grey h-page">
            <Container className='p-5'>
                <h3 className='mb-1 mt-3 ff-abhaya fw-extra-bold f-36 text-center text-lg-start'>{user?.fullName} Menus</h3>
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

                            <Col className='my-5 mx-auto d-flex flex-column justify-content-center align-items-center'>
                                <img alt="" src={emptyImage} width='200px' />
                                <h1>Whoops!!, No data product!! :( </h1>
                            </Col>
                        )}
                    </Row>

                </div>
            </Container>
        </div>

    )
}

export default MenusEl