import React, { memo, useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { app } from "../firebaseConfig";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useUserAuth } from "../context/userContext";

const CartDrawer = ({
  isCartOpen,
  setIsCartOpen,
  cartData,
  setCartData,
  quantity,
  setQuantity,
}) => {
  const { user } = useUserAuth();
  const [productData, setProductData] = useState();
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const db = getDatabase(app);

  const getAllProducts = () => {
    const distanceRef = ref(db, "users/" + user.uid + "/cart");
    onValue(distanceRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      setProductData(productsArray);
      const totalPrice = productData
        ? productData.reduce(
            (total, product) =>
              total + parseInt(product.price) * parseInt(product.quantity),
            0
          )
        : [];
      console.log(totalPrice);
      setPrice(totalPrice);
    });
  };
  const toggleDrawer = () => {
    if (user) {
      getAllProducts();
      const totalPrice = productData
        ? productData.reduce(
            (total, product) =>
              total + parseInt(product.price) * parseInt(product.quantity),
            0
          )
        : [];
      console.log(totalPrice);
      setPrice(totalPrice);
      setIsCartOpen((prevState) => !prevState);
    } else {
      return alert("Please SignIn to open cart.");
    }
  };
  const handleClick = () => {
    // console.log(productData)
    if (!productData) {
      alert("No product in cart!");
    } else {
      navigate("/checkout");
      toggleDrawer();
    }
  };

  const deleteItem = (id) => {
    console.log(id);
    let updatedArray;
    const productRef = ref(db, "users/" + user.uid + "/cart/");
    onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      updatedArray = productsArray.filter((p) => p.prodId !== id);
    });
    set(productRef, updatedArray)
      .then(() => {
        console.log("Product deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
    getAllProducts();
  };

  return (
    <>
      <button className="btnDrawerToggle" onClick={toggleDrawer}>
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
      <Drawer
        open={isCartOpen}
        onClose={toggleDrawer}
        direction="right"
        className="drawerMain"
        lockBackgroundScroll="true"
        style={{ backgroundColor: "#f06060", width: window.innerWidth > 786 ? "25vw" : "90vw" }}
      >
        <div className="cartHeader">
          <h4>Your Cart</h4>
          <p onClick={toggleDrawer}>
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </p>
        </div>
        <hr className="whiteDivider" />

        <div className="container cartProductDescription">
          {productData ? (
            productData.map((product, index) => (
              <>
                <div className="cartHeader " key={index}>
                  <img
                    src={product.image}
                    alt="productImg"
                    className="cartImgAdjust"
                  />
                  <div className="description margins">
                    {product.productName}
                    <span className="quntity-counter">
                      <input
                        type="text"
                        name="quantity"
                        id="quantity"
                        className="quantity-input-cart"
                        disabled
                        defaultValue={product.quantity}
                        value={product.quantity}
                      />
                      <button
                        className="btnItemChanger"
                        onClick={() => {
                          deleteItem(product.prodId);
                        }}
                      >
                        ❌
                      </button>
                    </span>
                  </div>
                </div>
                <hr className="whiteDivider100" />
              </>
            ))
          ) : (
            <>Loading...</>
          )}

          <div className="specialInstructionsCart">
            <p className="whiteText">Special Instructions for seller</p>
            <textarea
              name="special-instructions"
              className="input-full"
            ></textarea>
            <hr className="whiteDivider100" />
          </div>
        </div>
        <div className=" fixed-part-of-cart">
          <div className="container ">
            <div className="sub-total-cart">
              <h5>SUBTOTAL</h5>
              <h5>RS.{price}</h5>
            </div>
            <p>Tax included and shipping calculated at checkout</p>
            <button className="btnCheckOut" onClick={handleClick}>
              CHECK OUT →
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default memo(CartDrawer);
