import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/styles.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContextProvider } from './components/Contexts/userContext';
import { CartContext } from './components/Contexts/CartContext';


const client = new QueryClient()

function AppRouter() {
  const [cartLength, setCartLength] = useState(0);

  return (
    <UserContextProvider>
      <CartContext.Provider value={{ cartLength, setCartLength }}>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
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
