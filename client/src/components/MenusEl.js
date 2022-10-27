import React, {useContext} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { menus } from '../dataDummy/menus'
import { CartContext } from './Contexts/CartContext';

function MenusEl() {

    const {cartCount, setCartCount} = useContext(CartContext) 

    return (
        <div className="container-grey">
            <Container className='p-5'>
                <h3 className='mb-1 mt-3 ff-abhaya fw-extra-bold f-36 text-center text-lg-start'>Geprek Bensu, Menus</h3>
                <div className="d-flex">

                    <Row className=''>

                        {menus.map((menu, index) => (

                            <Col key={index} className="col-12 col-md-6 col-lg-3 p-3">

                                <Card style={{ width: '100%' }} className="my-3 p-2">
                                    <Card.Img variant="top" src={menu.image} className="mb-2" />
                                    <Card.Body className='p-0'>
                                        <Card.Title className='ff-abhaya f-18 fw-extra-bold'>{menu.name}</Card.Title>
                                        <Card.Text className='text-danger f-14 ff-avenir'>
                                            {menu.price}
                                        </Card.Text>
                                        <Button className='btn-full bg-yellow text-dark f-14 fw-extra-bold ff-avenir' onClick={() => setCartCount(cartCount+1)}>Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>

    )
}

export default MenusEl