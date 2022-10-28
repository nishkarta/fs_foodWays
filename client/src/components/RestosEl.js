import React, { useContext, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import LoginEl from '../Auth/LoginEl';
import RegisterEl from '../Auth/RegisterEl';
import { UserContext } from './Contexts/userContext';
import emptyImage from "../images/emptyImage.svg"
import { useQuery } from 'react-query';
import { API } from '../config/api';


function RestoCard({ item }) {
    const navigate = useNavigate()
    const [state] = useContext(UserContext);


    const [showLog, setShowLog] = useState(false);
    const [showReg, setShowReg] = useState(false);

    const handleShowLog = () => {
        setShowLog(true)
    };

    return (
        <>
            <Card onClick={state.isLogin ? () => navigate('/details') : handleShowLog} style={{ width: '100%', cursor: 'pointer' }} className="my-3 p-2 border-0">
                <Card.Img variant="top" src={item.image} className='mb-3' />
                <Card.Body className='p-0'>
                    <Card.Title className='ff-abhaya fw-extra-bold f-18 text-start'>{item.fullName}</Card.Title>
                    <Card.Text className='ff-avenir f-14'>
                        1 KM
                    </Card.Text>
                </Card.Body>
            </Card>

            <LoginEl showLog={showLog} setShowLog={setShowLog} setShowReg={setShowReg} />

            <RegisterEl showReg={showReg} setShowReg={setShowReg} setShowLog={setShowLog} />
        </>
    )
}

function RestosEl() {


    let { data: users } = useQuery('usersCache', async () => {
        const response = await API.get('/users')
        return response.data.data
    })

    return (
        <>
            <Container className='p-5'>
                <h3 className='text-center text-lg-start mb-3 ff-abhaya fw-extra-bold f-36'>Restaurant Near You</h3>
                <div className="">

                    <Row className=''>
                        {users?.length !== 0 ? (

                            <>
                                {users?.map((item, index) => (item.role === "adm" &&
                                    <Col className="col-12 col-md-6 col-lg-3">
                                        <RestoCard item={item} key={index} />
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
                                    <div className="mt-3">No data resto</div>
                                </div>
                            </Col>
                        )}


                    </Row>
                </div>
            </Container>


        </>

    )
}

export default RestosEl