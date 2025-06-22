import './App.css'
import MyNav from './components/header/Header';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './components/Homepage/HomePage';
import Cart from './components/cart/cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './components/Products/ProductsPage';
import CheckoutPage from './components/Checkout/CheckoutPage';

export default function App() {
  return (
        <div className="App">
            <BrowserRouter>
              <MyNav />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path ="/ProductsPage" element={<ProductsPage />} />
                  <Route path ="/CheckoutPage" element={<CheckoutPage />} />
                  
                </Routes>
            </BrowserRouter>
        </div>
  );
}