import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrdersStyles.css';


const OrderList = ({ }) => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [ordenSelec, setOrdenSelec] = useState(null);

    useEffect(() => {
        const url = 'https://eshop-deve.herokuapp.com/api/v2/orders';
        const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAF fnPldd8QzWvgVQ';

        const request = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    }
                });
                console.log('RESPONSE: ', response.data)
                setOrders(response.data.orders);

            } catch (error) {
                console.error(`Error obtaining data: ${error.message}`);
            }
        };

        request();
    }, []);


    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Órdenes</h1>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {orders.map((orden) => (
                    <li
                        key={orden.id}
                        className={`orden-item ${orden.id === ordenSelec ? 'orden-seleccionada' : ''}`}
                        onClick={() => navigate(`/order/${orden.id}`, { state: { order: orden } })}
                        style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '10px', cursor: 'pointer' }}
                    >
                        <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 'bold' }}>Número de Orden:</p>
                            <p style={{ marginTop: '5px' }}>{orden.number}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 'bold' }}>Total:</p>
                            <p style={{ marginTop: '5px' }}>{Number(orden.totals.total).toLocaleString('es-MX', { style: 'currency', currency: orden.currency })}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 'bold' }}>Fecha:</p>
                            <p style={{ marginTop: '5px' }}>{orden.dates.paidAt}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;





