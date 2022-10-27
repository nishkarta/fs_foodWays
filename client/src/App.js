import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import './styles/App.css';

import NavbarEl from './components/NavbarEl';
// import { LoginContext } from './components/Contexts/LoginContext';
import { CartContext } from './components/Contexts/CartContext';

import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContext } from './components/Contexts/userContext';

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { UserContextProvider } from './components/Contexts/userContext';
import { API, setAuthToken } from "./config/api";

import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import EditEl from './components/EditEl';
import Details from './pages/Details';
import AddProduct from './pages/AddProduct';
import Transactions from './pages/Transactions';
import PartnerProfileEl from './components/Partners/PartnerProfileEl';

// import { Outlet, Navigate } from "react-router-dom";



// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

function App() {
  let navigate = useNavigate();

  const [cartCount, setCartCount] = useState(3)
  // const [isLoading, setIsLoading] = useState(true)
  const [state, dispatch] = useContext(UserContext)

  // const PrivateRoute = ({ element: Component, ...rest }) => {
  //   const [state] = useContext(UserContext)

  //   return state.isLogin ? <Outlet /> : <Navigate to="/" />;
  // };


  const checkUser = async () => {
    try {

      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await API.get("/check-auth");
      console.log(response)

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>

      <NavbarEl />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/" element={<PrivateRoute />}> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/details" element={<Details />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/partner-profile" element={<PartnerProfileEl />} />
        <Route exact path="/edit-profile" element={<EditEl />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route exact path="/transactions" element={<Transactions />} />
        {/* </Route> */}
      </Routes>

    </CartContext.Provider>
  );
}

export default App;
