import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdenesComponent = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const url = 'https://eshop-deve.herokuapp.com/api/v2/orders';
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAF fnPldd8QzWvgVQ';

    const obtenerOrdenes = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });
        console.log('RESPONSE: ', response.data)
        setOrdenes(response.data.orders);

      } catch (error) {
        console.error(`Error al obtener las órdenes: ${error.message}`);
      }
    };

    

    obtenerOrdenes();
  }, []);

  return (
    <div>
      <h1>Lista de Órdenes</h1>
      <ul>
        {ordenes.map((orden) => (
          <li key={orden.id}>
            <span>Número de Orden: {orden.number}</span>
            {/* Puedes agregar más detalles de la orden según tus necesidades */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdenesComponent;
