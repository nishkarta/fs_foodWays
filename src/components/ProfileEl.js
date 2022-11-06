import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
// import { users } from "../dataDummy/users";
import { transactions } from "../dataDummy/transactions";
import waysdeliv from "../images/waysdeliv.png";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import userpp from "../images/defaultuserpp.jpg"
import restopp from "../images/defaultrestopp.jpg"

import { UserContext } from "./Contexts/userContext";
import { CartContext } from "./Contexts/CartContext";
import { useQuery } from "react-query";
import convertRupiah from "rupiah-format";


function ProfileEl() {
  const [state] = useContext(UserContext)
  const navigate = useNavigate();
  const handleNavigateToEdit = () => {
    navigate("/edit-profile");
  };
  const { cartLength, setCartLength } = useContext(CartContext);

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
  // console.log(subTotal);
  useEffect(() => {
    refetch()
  }, [])

  const [user, setUser] = useState(null)

  const getUser = async () => {
    const response = await API.get(`/user/${state.user.id}`)
    setUser(response.data.data)
  }

  // getUser()
  useEffect(() => {

    if (state.user) {
      getUser()
    }
  }, [state])



  // let { data: user, isLoading } = useQuery('userProfileCache', async () => {
  //   const response = await API.get(`/user/${state.user.id}`)
  //   console.log(isLoading);
  //   return response.data.data
  // })

  return (
    <div className="container-grey h-page">
      <Container className="p-5">
        <Row className="mt-3">
          <Col className="col-12 col-lg-7  mb-5">
            <h3 className="mb-3 ff-abhaya f-36 fw-extra-bold text-center text-lg-start">
              My Profile
            </h3>
            <div className="row">

              <>
                <Col className=" col-12 col-sm-5 col-md-4">
                  <div>
                    <Card
                      style={{ width: "100%" }}
                      className=" container-grey border-0 mb-5"
                    >
                      <Card.Img style={{ height: '200px', objectFit: 'cover' }}
                        variant="top" alt="pp"
                        src={user?.image !== "http://localhost:5000/uploads/" ? user?.image : user?.role === "adm" ? restopp : userpp}
                        // onError={event => {
                        //   event.target.src = { userpp }
                        //   event.onerror = null
                        // }}
                        className="rounded mb-3"
                      />
                      <Button
                        className="btn-full btn-brown text-white fw-bold f-14 p-2"
                        onClick={handleNavigateToEdit}
                      >
                        Edit Profile
                      </Button>
                    </Card>
                  </div>
                </Col>
                <Col className=" ff-avenir f-18">
                  <div className="mx-3 text-center text-sm-start">
                    <div className="">
                      <h4 className="text-lighter-brown fw-bold f-18">
                        Full Name
                      </h4>
                      <p>{user?.fullName}</p>
                    </div>
                    <div>
                      <h4 className="text-lighter-brown f-18">Email</h4>
                      <p>{user?.email}</p>
                    </div>
                    <div>
                      <h4 className="text-lighter-brown f-18">Phone</h4>
                      <p>{user?.phone}</p>
                    </div>
                  </div>
                </Col>
              </>

            </div>
          </Col>

          {state.user.role === "cust" ? <Col className="col-12 col-lg-5">

            <h3 className="mb-3 ff-abhaya f-36 fw-extra-bold text-center text-lg-start">

              Transaction History
            </h3>

            {cartData?.length > 0 && (


              <div className="d-flex bg-white justify-content-between align-items-center px-2 py-3 mb-4">
                <div className="">
                  <h6 className="ff-abhaya fw-extra-bold mb-1">
                    Resto 1
                  </h6>
                  <p className="ff-avenir mb-2" style={{ fontSize: "10px" }}>
                    <span className="fw-bold">Sunday, </span>
                    31 October 2022
                  </p>
                  <p
                    className="ff-avenir text-danger fw-bolder"
                    style={{ fontSize: "11px" }}
                  >
                    Total {convertRupiah.convert(subTotal + 10000)}
                  </p>
                </div>
                <div className=" text-end">
                  <img src={waysdeliv} alt="" className="mb-1" />
                  <button
                    className="border-0 btn-green-trans float-right fw-bold f-11"
                    style={{ width: "60%" }}
                  >
                    <span>finished</span>
                  </button>
                </div>
              </div>


            )}

          </Col>
            : <Col className='col-12 col-lg-5'>


              <h3 className='mb-3 ff-abhaya f-36 fw-extra-bold text-center text-lg-start'>Order Histories</h3>




              {transactions.map((trans, index) => (
                <div key={index} className="d-flex bg-white justify-content-between align-items-center px-2 py-3 mb-4">
                  <div className="">
                    <h6 className='ff-abhaya fw-extra-bold mb-1'>{trans.storeName}</h6>
                    <p className='ff-avenir mb-2' style={{ fontSize: '10px' }}><span className='fw-bold'>Saturday, </span>{trans.date}</p>
                    <p className='ff-avenir text-danger fw-bolder' style={{ fontSize: '11px' }}>Total {trans.total}</p>

                  </div>
                  <div key={index} className=' text-end'>
                    <img src={waysdeliv} alt="" className='mb-1' />
                    <button onClick={() => navigate('/transactions')} className='border-0 btn-green-trans float-right fw-bold f-11' style={{ width: '60%' }}><span>{trans.status}</span></button>
                  </div>
                </div>
              ))}



            </Col>
          }
        </Row>
      </Container>
    </div>
  );
}

export default ProfileEl;
