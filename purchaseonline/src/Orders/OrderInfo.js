import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CamisaNegraImage from '../assets/img/Camisa-Blanca.png';
import { useNavigate } from 'react-router-dom';


const OrderInfo = () => {
    const location = useLocation();
    const { order } = location.state || {};
    const [quantities, setQuantities] = useState({});
    const [subtotal, setSubtotal] = useState(parseFloat(order.totals.subtotal));
    const [total, setTotal] = useState(parseFloat(order.totals.total));
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [card, setCard] = useState('');
    const [borderColor, setBorderColor] = useState({
        nombre: '#808080',
        direccion: '#808080',
        tarjeta: '#808080',
    });

    const navigate = useNavigate();

    const ButtonConfirm = () => {

        const invalidFields = [];

        const selectedItem = order.items.length > 0 ? order.items[0] : null;
        const itemName = selectedItem ? selectedItem.name : '';

        if (name.trim() === '') {
            invalidFields.push('nombre');
        }
        if (address.trim() === '') {
            invalidFields.push('dirección');
        }
        if (card.trim() === '') {
            invalidFields.push('tarjeta');
        }

        console.log('Campos inválidos:', invalidFields);

        if (invalidFields.length > 0) {
            alert('Los campos no pueden estar vacios.');

            setBorderColor((prevBorderColor) => ({
                ...prevBorderColor,
                nombre: invalidFields.includes('nombre') ? '#ffcccc' : '#808080',
                direccion: invalidFields.includes('dirección') ? '#ffcccc' : '#808080',
                tarjeta: invalidFields.includes('tarjeta') ? '#ffcccc' : '#808080',
            }));

        } else {
            navigate('./ConfirmedPurchase', {
                state: {
                    itemName,
                    customerName: name,
                    customerAddress: address,
                    customerCard: card,
                    orderTotal: total,
                },
            });
            console.log('Campos válidos');
        }
    };



    useEffect(() => {
        const initialQuantities = {};
        order.items.forEach(item => {
            initialQuantities[item.id] = Number(item.quantity);
        });
        setQuantities(initialQuantities);
    }, [order]);


    const updateQuantity = (itemId, amount) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: Math.max(1, prevQuantities[itemId] + amount),
        }));
    };


    if (!order) {
        return <p>Orden no encontrada</p>;
    }


    return (
        <form>
            <div className="title">
                <h1 style={{ textAlign: 'center' }} >Detalles de la Orden</h1>

                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'flex-start', textAlign: 'left', marginBottom: '15px' }}>
                    <div style={{ flexBasis: '80%', marginRight: '20px' }}>
                        <img src={CamisaNegraImage} alt="Camisa Negra" style={{ width: '100%', height: 'auto' }} />
                    </div>

                    <div style={{ flexBasis: '90%', marginTop: '0px', marginLeft: '180px' }}>
                        <p style={{ fontWeight: 'bold' }}>Número de Orden: {order.number}</p>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {order.items.map((item) => (
                                <li key={item.id} style={{ textAlign: 'left', marginBottom: '15px' }}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label htmlFor={`codigo-${item.id}`}><strong>Codigo </strong></label>
                                        <br />
                                        <input
                                            type="text"
                                            id={`codigo-${item.id}`}
                                            value={item.sku}
                                            readOnly
                                            style={{
                                                width: '450px',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                borderColor: '##808080',
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label htmlFor={`producto-${item.id}`}><strong>Producto </strong></label>
                                        <br />
                                        <input type="text" id={`producto-${item.id}`} value={item.name} readOnly
                                            style={{
                                                width: '450px',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                borderColor: '##808080',
                                            }} />
                                    </div>
                                    <label htmlFor={`cantidad-${item.id}`} style={{ marginBottom: '5px' }}><strong>Cantidad</strong></label>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '20px' }}>
                                        <button type="button" onClick={() => updateQuantity(item.id, -1)} style={{ marginBottom: '5px', marginRight: '5px' }}>-</button>
                                        <input type="text" id={`cantidad-${item.id}`} value={quantities[item.id]} readOnly style={{ width: '80px', height: 20, textAlign: 'center', margin: '0 9px', borderRadius: '8px', borderColor: '##808080', }} />
                                        <button type="button" onClick={() => updateQuantity(item.id, 1)} style={{ marginLeft: '5px' }}>+</button>
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label htmlFor={`cantidad-${item.id}`} style={{ marginBottom: '5px' }}><strong>Nombre</strong></label>
                                        <br />
                                        <input
                                            type="text"
                                            id={`producto-${item.id}`}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{
                                                width: '450px',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                borderColor: borderColor.nombre,
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label htmlFor={`cantidad-${item.id}`} style={{ marginBottom: '5px' }}><strong>Dirección</strong></label>
                                        <br />
                                        <input
                                            type="text"
                                            id={`producto-${item.id}`}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            style={{
                                                width: '450px',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                borderColor: borderColor.direccion,
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label htmlFor={`cantidad-${item.id}`} style={{ marginBottom: '5px' }}><strong>Tarjeta</strong></label>
                                        <br />
                                        <input
                                            type="text"
                                            id={`producto-${item.id}`}
                                            value={card}
                                            onChange={(e) => setCard(e.target.value)}
                                            style={{
                                                width: '450px',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                borderColor: borderColor.tarjeta,
                                            }}
                                        />
                                    </div>
                                    <p><strong>Precio:</strong> {Number(item.price).toLocaleString('es-MX', { style: 'currency', currency: order.currency })}</p>
                                    <p><strong>Descuento:</strong> {Number(item.discount).toLocaleString('es-MX', { style: 'currency', currency: order.currency })}</p>
                                </li>
                            ))}
                        </ul>
                        <div style={{ fontWeight: 'bold', marginTop: '0px', textAlign: 'right', marginRight: '190px' }}>
                            <p>Subtotal: {subtotal.toLocaleString('es-MX', { style: 'currency', currency: order.currency })}</p>
                            <p>Total: {total.toLocaleString('es-MX', { style: 'currency', currency: order.currency })}</p>
                        </div>
                        <button type="button" onClick={ButtonConfirm} style={{ background: '#061137', color: 'white', fontSize: '18px', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );

};

export default OrderInfo;
