import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ListaOrdenes from './Orders/OrderList';
import Encabezado from './Encabezado/Encabezado';
import OrderInfo from './Orders/OrderInfo';
import ConfirmedPurchase from './Orders/ConfirmedPurchase';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Encabezado />
      <Routes>
        <Route path="/" element={<ListaOrdenes />} />
        <Route path="/order/:orderId" element={<OrderInfo />} />
        <Route path="/order/:orderId/confirmedpurchase" element={<ConfirmedPurchase />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
