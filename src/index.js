import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/styles.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContextProvider } from './components/Contexts/userContext';
import { CartContext } from './components/Contexts/CartContext';
import { MarkerContext } from './components/Contexts/MarkerContext';


const client = new QueryClient()

function AppRouter() {
  const [cartLength, setCartLength] = useState(0);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLatitudeCurr(position.coords.latitude)
  //     setLongitudeCurr(position.coords.longitude)
  //   })

  // }, [])
  // console.log("ini latitude di index", latitudeCurr)

  let [loc, setLoc] = useState()

  return (
    <UserContextProvider>
      <CartContext.Provider value={{ cartLength, setCartLength }}>
        <MarkerContext.Provider value={{ loc, setLoc }}>
          <QueryClientProvider client={client}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </MarkerContext.Provider>
      </CartContext.Provider>
    </UserContextProvider>

  )

}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
