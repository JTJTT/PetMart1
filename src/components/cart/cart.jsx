import React, { useState, useEffect, useRef } from 'react';
import './cart.css';
import items from '../../items.json';

//DEBUG ISSUE: cart component first loading cartItems as an empty array, so it overwrites sessionStorage
// as an empty array, causing cart to be empty on refresh
const Cart = () => {
    const TAX_RATE = 0.06;
    //state to hold cart items
    const [cartItems, setCartItems] = useState([]);
    const didMount = useRef(false); //useRef to track if component has mounted

        useEffect(() => {
            const savedCart = sessionStorage.getItem('cartItems');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart)); //load saved cart items
            } 
        }, []); //Runs only once when mounting
    
        //save cart items to sessionStorage and its changes
        useEffect(() => {
            if (didMount.current) {
                sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        } else {
            didMount.current = true;
        }
    }, [cartItems]);

    //calc total cost before tax
    const calculateSubtotal = () => {
        //.reduce method used to calculazte value 
        return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);                                   
    };
    //calc tax
    const calculateTax = () => {
        return calculateSubtotal() * TAX_RATE;
    };
    //add subtotal and tax
    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };


    //update quantity
    const updateQuantity = (id, quantity) => {
        //setCartItems uses the useState function to update the current state of the cart items
        setCartItems((prevItems) =>
            //prevItems is the current cart items, .map goes through every item to check if it matches the id we want to update
            prevItems.map((item) =>
                //if current id(item.id) matches the id we want to update
                item.id === id
                //then do this(update quantity,-->minimum quantity HAS to be 1-->makes sure quantity can exceed stock)
                ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
                //if the id doesnt match, just return item as is
                : item
            )
        );
    };
    //remove item from cart
    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <div className="cart">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity || 1}
                                            min="1"
                                            onChange={(e) =>
                                                updateQuantity(item.id, parseInt(e.target.value, 10))
                                            }
                                        />
                                    </td>
                                    <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => removeItem(item.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="cart-summary">
                        <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                        <p>Tax (6%): ${calculateTax().toFixed(2)}</p>
                        <p>Total: ${calculateTotal().toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;