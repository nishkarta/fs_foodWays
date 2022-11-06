import React, { useContext, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import LoginEl from '../Auth/LoginEl';
import RegisterEl from '../Auth/RegisterEl';
import { UserContext } from './Contexts/userContext';
import emptyImage from "../images/emptyImage.svg"
import { useQuery } from 'react-query';
import { API } from '../config/api';

import restopp from "../images/defaultrestopp.jpg"


function RestoCard({ item }) {
    const navigate = useNavigate()
    const [state] = useContext(UserContext);
    // const loc1 = [-6.402648405963884,106.83071136474611]
    // const loc2 = [-6.405255904575551,106.79335382401636]



    const [showLog, setShowLog] = useState(false);
    const [showReg, setShowReg] = useState(false);

    const handleShowLog = () => {
        setShowLog(true)
    };

    return (
        <>
            <Card onClick={state.isLogin ? () => navigate(`/details/${item.id}`) : handleShowLog} style={{ width: '100%', cursor: 'pointer' }} className="my-3 p-2 border-0">
                <Card.Img variant="top" src={item?.image !== "http://localhost:5000/uploads/" ? item?.image : restopp} className='mb-3' style={{ height: '200px', objectFit: 'cover' }} />
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
                                    <Col className="col-12 col-md-6 col-lg-3" key={index}>
                                        <RestoCard item={item} />
                                    </Col>
                                ))}
                            </>

                        ) : (
                            // <Col>
                            //     <div className="text-center pt-5">
                            //         <img
                            //             src={emptyImage}
                            //             className="img-fluid"
                            //             style={{ width: "40%" }}
                            //             alt="empty"
                            //         />
                            //         <div className="mt-3">No data resto</div>
                            //     </div>
                            // </Col>

                            <Col className='d-flex flex-column justify-content-center align-items-center'>
                                <img alt="" src={emptyImage} width='200px' />
                                <h1>Whoops!!, No data resto!! :( </h1>
                            </Col>
                        )}


                    </Row>
                </div>
            </Container>


        </>

    )
}

export default RestosEl