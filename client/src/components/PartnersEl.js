import Card from 'react-bootstrap/Card';
import React, { useContext, useState } from 'react'

// import List from './List';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import emptyImage from "../images/emptyImage.svg"
import { useNavigate } from 'react-router-dom';
import LoginEl from '../Auth/LoginEl';
import RegisterEl from '../Auth/RegisterEl';
import { UserContext } from './Contexts/userContext';

import restopp from "../images/defaultrestopp.jpg"



function PartnerCard({ item }) {
    const navigate = useNavigate()

    const [state] = useContext(UserContext);


    const [showLog, setShowLog] = useState(false);
    const [showReg, setShowReg] = useState(false);


    const handleShowLog = () => {
        setShowLog(true)
    };

    return (
        <>

            <Card onClick={state.isLogin ? () => navigate(`/details/${item.id}`) : handleShowLog} style={{ width: '100%', cursor: 'pointer' }} className="my-3 p-3 border-0">
                <Row className='d-flex align-items-center'>
                    <Col className='col-5'>
                        <img src={item?.image !== "http://localhost:5000/uploads/" ? item?.image : restopp} style={{ width: '65px', height: '65px', objectFit: 'cover' }} className='rounded-circle' alt='dfdcv' />
                    </Col>
                    <Col className='col-7 ps-0'>
                        <Card.Title className='ff-abhaya text-start fw-extra-bold f-24'>{item.fullName}</Card.Title>
                    </Col>
                </Row>

            </Card>

            <LoginEl showLog={showLog} setShowLog={setShowLog} setShowReg={setShowReg} />

            <RegisterEl showReg={showReg} setShowReg={setShowReg} setShowLog={setShowLog} />
        </>
    )
}

function PartnersEl() {

    let { data: users } = useQuery('usersCache', async () => {
        const response = await API.get('/users')
        return response.data.data
    })

    return (
        <>
            <Container className='p-5'>
                <h3 className='text-center text-lg-start mb-3 ff-abhaya fw-extra-bold f-36'>Popular Restaurants</h3>
                <div className="">

                    <Row className=''>

                        {users?.length !== 0 ? (

                            <>
                                {users?.map((item, index) => (item.role === "adm" &&
                                    <Col className="col-12 col-md-6 col-lg-3" key={index}>
                                        <PartnerCard item={item} />
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
                            //         <div className="mt-3">No data partner</div>
                            //     </div>
                            // </Col>
                            <Col className='d-flex flex-column justify-content-center align-items-center'>
                                <img alt="" src={emptyImage} width='200px' />
                                <h1>Whoops!!, No data partner!! :( </h1>
                            </Col>
                        )}
                    </Row>

                </div>
            </Container>


        </>



    );
}

export default PartnersEl;