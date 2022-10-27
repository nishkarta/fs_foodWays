import React, { useContext, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { restos } from '../dataDummy/restos'
import { useNavigate } from "react-router-dom";
import LoginEl from '../Auth/LoginEl';
import RegisterEl from '../Auth/RegisterEl';
import { UserContext } from './Contexts/userContext';

function RestosEl() {
    const [state] = useContext(UserContext);


    const [showLog, setShowLog] = useState(false);
    const [showReg, setShowReg] = useState(false);


    const handleShowLog = () => {
        setShowLog(true)
    };



    const navigate = useNavigate();

    return (
        <>
            <Container className='p-5'>
                <h3 className='text-center text-lg-start mb-3 ff-abhaya fw-extra-bold f-36'>Restaurant Near You</h3>
                <div className="">

                    <Row className=''>

                        {restos.map((resto, index) => (

                            <Col key={index} className="col-12 col-md-4 col-lg-3">

                                <Card onClick={state.isLogin ? () => navigate('/details') : handleShowLog} style={{ width: '100%', cursor: 'pointer' }} className="my-3 p-2 border-0">
                                    <Card.Img variant="top" src={resto.image} className='mb-3' />
                                    <Card.Body className='p-0'>
                                        <Card.Title className='ff-abhaya fw-extra-bold f-18 text-start'>{resto.name}</Card.Title>
                                        <Card.Text className='ff-avenir f-14'>
                                            {resto.distance}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
            <LoginEl showLog={showLog} setShowLog={setShowLog} setShowReg={setShowReg} />

            <RegisterEl showReg={showReg} setShowReg={setShowReg} setShowLog={setShowLog} />

        </>

    )
}

export default RestosEl