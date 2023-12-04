import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Items from './views/Items.jsx'
import Checkout from './views/Checkout.jsx'
import Login from './views/Login.jsx'
import Signup from './views/Signup.jsx'
import OrderPlaced from './views/OrderPlaced.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path='/' />
      <Route element={<Items />} path='/item' />
      <Route element={<Checkout />} path='/checkout' />
      <Route element={<Login />} path='/login' />
      <Route element={<Signup />} path='/signup' />
      <Route element={<OrderPlaced />} path='/orderPlaced' />
    </Routes>
  </BrowserRouter>
)
