
import React, { useContext, useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";

import { Badge, Container, Navbar, Button, Dropdown } from 'react-bootstrap'


import logo from '../images/logo.svg';
import cart from '../images/cart.png'
import pp from '../images/cart (2).png'
import pp2 from '../images/part.png'
import usericon from '../images/user.png'
import logout from '../images/logout.png'
import prods from '../images/prods.png'
import userpp from "../images/defaultuserpp.jpg"
import restopp from "../images/defaultrestopp.jpg"


import { CartContext } from './Contexts/CartContext';

import LoginEl from '../Auth/LoginEl';
import RegisterEl from '../Auth/RegisterEl';

import { UserContext } from './Contexts/userContext';
import { API } from '../config/api';




function NavbarEl() {


    const navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    const { cartCount } = useContext(CartContext)

    const [showLog, setShowLog] = useState(false);
    const [showReg, setShowReg] = useState(false);

    const [user, setUser] = useState(null)

    const getUser = async () => {
        const response = await API.get(`/user/${state.user.id}`)
        setUser(response.data.data)
    }

    useEffect(() => {

        if (state.user) {
            getUser()
        }
    }, [state])




    const handleShowLog = () => {
        setShowReg(false)
        setShowLog(true)
    };

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
    }

    const handleShowReg = () => {
        setShowLog(false)
        setShowReg(true)
    };


    const handleNavigateToHome = () => {
        navigate("/")
    }
    const handleNavigateToProfile = () => {
        navigate("/profile");
    };
    const handleNavigateToProfilePartner = () => {
        navigate("/partner-profile");
    };
    const handleNavigateToCart = () => {
        navigate("/cart")
    }
    const handleNavigateToAddProduct = () => {
        navigate("/add-product")
    }


    return (
        <>
            <Navbar expand='lg' className='bg-yellow navbar h-nav' sticky='top' collapseOnSelect>
                <Container>
                    <Navbar.Brand onClick={handleNavigateToHome} className='navbar-brand'>WaysFood  <img
                        alt=""
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

                        {!state.isLogin ? (<><Button className='btn btn-brown text-white me-2' onClick={handleShowReg} >Register</Button>
                            <Button className='btn btn-brown text-white' onClick={handleShowLog}>Login</Button></>) : state.user.role === 'cust' ? (<div>
                                <Dropdown>
                                    <span >
                                        <img src={cart} alt='' onClick={handleNavigateToCart} className='me-0' style={{}} /> <Badge bg="danger" style={{ position: 'relative', borderRadius: '50%', width: '20px', height: '20px', left: '-14px', top: '-4px' }}><span style={{ position: 'relative', right: '1px', top: '-1px' }}>{cartCount}</span></Badge>

                                    </span>

                                    <Dropdown.Toggle variant="bg-yellow" id="dropdown-basic">
                                        <img src={user?.image !== "http://localhost:5000/uploads/" ? user?.image : user?.role === "adm" ? restopp : userpp} style={{ width: '70px', height: '70px', borderRadius: '50%' }} alt='' />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleNavigateToProfile}><img src={usericon} alt='' className='me-2'></img>
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Divider />

                                        <Dropdown.Item onClick={handleLogout}><img src={logout} alt='' className='me-2' />Logout</Dropdown.Item>


                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>) : (<Dropdown>

                                <Dropdown.Toggle variant="bg-yellow" id="dropdown-basic">
                                    <img src={user?.image !== "http://localhost:5000/uploads/" ? user?.image : user?.role === "adm" ? restopp : userpp} style={{ width: '70px', height: '70px', borderRadius: '50%' }} alt='' />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleNavigateToProfile}><img src={usericon} alt='' className='me-2'></img>
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleNavigateToAddProduct}><img
                                        src={prods}
                                        alt='' className='me-2'
                                    />Add Products</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => navigate(`/details/${state.user.id}`)}><img
                                        src={prods}
                                        alt='' className='me-2'
                                    />My Products</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}><img src={logout} alt='' className='me-2' />Logout</Dropdown.Item>


                                </Dropdown.Menu>
                            </Dropdown>
                        )}




                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>

                <LoginEl showLog={showLog} setShowLog={setShowLog} setShowReg={setShowReg} />
                <RegisterEl showReg={showReg} setShowReg={setShowReg} setShowLog={setShowLog} />


            </div>
        </>

    )
}

export default NavbarEl