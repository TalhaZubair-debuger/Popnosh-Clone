import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import Shop from './components/Shop';
import { useState } from 'react';
import Checkout from './components/Checkout';
import { UserAuthContextProvider } from './context/userContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Gifts from './components/Gifts';
import ContactUs from './components/ContactUs';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [userCartIndex, setUserCartIndex] = useState(0);

  return (
    <main>
      <UserAuthContextProvider >
        <Navbar
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          cartData={cartData}
          setCartData={setCartData}
          quantity={quantity}
          setQuantity={setQuantity}
          userCartIndex={userCartIndex}
          setUserCartIndex={setUserCartIndex}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductPage
            userCartIndex={userCartIndex}
            setUserCartIndex={setUserCartIndex}
            setIsCartOpen={setIsCartOpen} />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/gifts' element={<Gifts />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
        </Routes>
        <Footer />
      </UserAuthContextProvider>
    </main>
  );
}

export default App;
