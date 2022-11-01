import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import './styles/App.css';


import NavbarEl from './components/NavbarEl';
import { CartContext } from './components/Contexts/CartContext';

import { UserContext } from './components/Contexts/userContext';

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { API, setAuthToken } from "./config/api";

import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import EditEl from './components/EditEl';
import Details from './pages/Details';
import AddProduct from './pages/AddProduct';
import Transactions from './pages/Transactions';
import EditProduct from './components/EditProduct';

import { Outlet, Navigate } from "react-router-dom";


function App() {
  let navigate = useNavigate();

  const [cartCount, setCartCount] = useState(3)
  const [isLoading, setIsLoading] = useState(true)
  const [state, dispatch] = useContext(UserContext)

  document.title = 'Foodways | Online Resto'


  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false && !isLoading) {
      navigate("/");
    }

  }, [state]);



  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }


      let payload = response.data.data;

      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  const PrivateRoute = () => {
    return state.isLogin ? <Outlet /> : <Navigate to="/" />;
  };


  return (
    <>

      {isLoading ? <></>
        :
        <>
          <NavbarEl />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/details/:id" element={<Details />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/edit-profile" element={<EditEl />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/add-product" element={<AddProduct />} />
              <Route exact path="/edit-product/:id" element={<EditProduct />} />
              <Route exact path="/transactions" element={<Transactions />} />
            </Route>
          </Routes>
        </>
      }
    </>

  );
}

export default App;
