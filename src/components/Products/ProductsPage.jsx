import React from 'react';
import items from '../../items.json';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProductsPage.css';

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
      //if not in cart already, add with quantity 1
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }
    console.log("Cart after add:", updatedCart);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    //alert user that product was added to cart
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="products-page">
      <h1 className="products-title">Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <Card key={product.id} className="product-card">
            <Card.Body>
              <Card.Title className="product-name">{product.name}</Card.Title>
              <Card.Text className="product-animal">Animal: {product.animal}</Card.Text>
              <Card.Text className="product-price">Price: ${product.price.toFixed(2)}</Card.Text>
              <Card.Text className="product-stock">Stock: {product.stock}</Card.Text>
              <Button
                variant="primary"
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;