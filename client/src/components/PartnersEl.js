import Card from 'react-bootstrap/Card';

// import List from './List';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { partners } from '../dataDummy/partners'


function PartnersEl() {
    return (
        <>
            <Container className='p-5'>
                <h3 className='text-center text-lg-start mb-3 ff-abhaya fw-extra-bold f-36'>Popular Restaurants</h3>
                <div className="">

                    <Row className=''>

                        {partners.map((partner, index) => (

                            <Col key={index} className="col-12 col-md-6 col-lg-3">

                                <Card style={{ width: '100%' }} className="my-3 p-3 border-0">
                                    <Row className='d-flex align-items-center'>
                                        <Col className='col-5'>
                                            <img src={partner.image} style={{ width: '65px', height: '65px' }} className='' alt='dfdcv' />
                                        </Col>
                                        <Col className='col-7 ps-0'>
                                            <Card.Title className='ff-abhaya text-start fw-extra-bold f-24'>{partner.name}</Card.Title>
                                        </Col>
                                    </Row>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </>



    );
}

export default PartnersEl;