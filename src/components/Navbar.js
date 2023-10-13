import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "../utils/CartDrawer";
import { useUserAuth } from "../context/userContext";

const Navbar = ({
  isCartOpen,
  setIsCartOpen,
  cartData,
  setCartData,
  quantity,
  setQuantity,
  userCartIndex,
  setUserCartIndex,
}) => {
  const { googleSignIn, logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      setUserCartIndex(0);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLogOut = async (e) => {
    try {
      e.preventDefault();
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
   
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <Link className="navbar-brand" to="/">
        <b>PopNosh</b>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="shop">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="gifts">
              Gifts
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="contact-us">
              Contact
            </Link>
          </li>
        </ul>
        <span className="form-inline my-2 my-lg-0">
          <span className="nav-right-align-btns">
            <CartDrawer
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              cartData={cartData}
              setCartData={setCartData}
              quantity={quantity}
              setQuantity={setQuantity}
              userCartIndex={userCartIndex}
              setUserCartIndex={setUserCartIndex}
            />
          </span>
          {user ? (
            <button className="nav-right-align-btns" onClick={handleLogOut}>
              LogOut
            </button>
          ) : (
            <button
              className="nav-right-align-btns"
              onClick={handleGoogleSignIn}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
