import React from 'react';
import { useLocation } from 'react-router-dom';



const ConfirmedPurchase = () => {

  const location = useLocation();

  const { itemName, customerName, customerAddress, customerCard, orderTotal } = location.state;

  return (
    <div style={{ textAlign: 'center', margin: '5rem', border: '2px solid black', padding: '1rem' }}>
      <h2 style={{ fontWeight: 'bold' }}>Compra Exitosa</h2>
      {/* <h2 style={{ fontWeight: 'bold' }}>Detalles de Compra</h2> */}
      <p style={{ fontWeight: 'bold' }}> Producto </p>
      <p>{itemName}</p>
      <p style={{ fontWeight: 'bold' }}> Cliente </p>
      <p> {customerName} </p>
      <p style={{ fontWeight: 'bold' }}> Dirección </p>
      <p> {customerAddress} </p>
      <p style={{ fontWeight: 'bold' }}> Tarjeta </p>
      <p> {customerCard} </p>
      <p style={{ fontWeight: 'bold' }}> Total </p>
      <p> ${orderTotal} </p>
      <p style={{ fontWeight: 'bold' }}> ¡Gracias por su compra! </p>
    </div>
  );
};

export default ConfirmedPurchase;
