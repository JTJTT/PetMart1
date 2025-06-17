import React from 'react';
import items from '../../items.json';

function ProductsPage() {
    //products from items.json
const products = [
    ...items.toys,
    ...items.clothes,
    ...items.treats,
    ...items.furniture,
  ];

  //add to cart handler using sessionStorage
  const addToCart = (product) => {
    //get current cart from sessionStorage or start with empty array
    const currentCart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    //check if product is already in cart
    const existing = currentCart.find(item => item.id === product.id);
    let updatedCart;
    if (existing) {
      //if in cart, increase quantity (but don't exceed stock)
      //? is a ternary operator, checks if condition is true use the value before the colon, othrwise use the value after the colon
      updatedCart = currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: Math.min((item.quantity || 1) + 1, product.stock) }
          : item
      );
    } else {
      //if not in cart, add with quantity 1
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }
    console.log("Cart after add:", updatedCart);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <h3>{product.name}</h3>
            <p>Animal: {product.animal}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;