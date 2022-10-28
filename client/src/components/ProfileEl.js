import React, { useContext } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
// import { users } from "../dataDummy/users";
import { transactions } from "../dataDummy/transactions";
import waysdeliv from "../images/waysdeliv.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

import { UserContext } from "./Contexts/userContext";

function ProfileEl() {
  const [state, dispatch] = useContext(UserContext)
  const navigate = useNavigate();
  const handleNavigateToEdit = () => {
    navigate("/edit-profile");
  };

  let { data: user } = useQuery('usersCache', async () => {
    const response = await API.get(`/user/${state.user.id}`)
    return response.data.data
  })

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
                      <Card.Img
                        variant="top"
                        src={user.image}
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
                      <p>{user.fullName}</p>
                    </div>
                    <div>
                      <h4 className="text-lighter-brown f-18">Email</h4>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <h4 className="text-lighter-brown f-18">Phone</h4>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                </Col>
              </>

            </div>
          </Col>
          <Col className="col-12 col-lg-5">
            <h3 className="mb-3 ff-abhaya f-36 fw-extra-bold text-center text-lg-start">
              Transaction History
            </h3>

            {transactions.map((trans, index) => (
              <div className="d-flex bg-white justify-content-between align-items-center px-2 py-3 mb-4">
                <div key={index} className="">
                  <h6 className="ff-abhaya fw-extra-bold mb-1">
                    {trans.storeName}
                  </h6>
                  <p className="ff-avenir mb-2" style={{ fontSize: "10px" }}>
                    <span className="fw-bold">Saturday, </span>
                    {trans.date}
                  </p>
                  <p
                    className="ff-avenir text-danger fw-bolder"
                    style={{ fontSize: "11px" }}
                  >
                    Total {trans.total}
                  </p>
                </div>
                <div key={index} className=" text-end">
                  <img src={waysdeliv} alt="" className="mb-1" />
                  <button
                    className="border-0 btn-green-trans float-right fw-bold f-11"
                    style={{ width: "60%" }}
                  >
                    <span>{trans.status}</span>
                  </button>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileEl;
