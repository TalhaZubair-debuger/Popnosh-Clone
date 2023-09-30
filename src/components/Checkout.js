import React, { memo, useEffect, useState } from "react";
import CustomButton from "../utils/CustomButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { app } from "../firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database";
import { useUserAuth } from "../context/userContext";

const Checkout = () => {
  const [alert, setAlert] = useState(false);
  const { user } = useUserAuth();
  const [productData, setProductData] = useState([]);
  const [price, setPrice] = useState();
  const db = getDatabase(app);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = () => {
    const distanceRef = ref(db, "users/" + user.uid + "/cart");
    onValue(distanceRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      setProductData(productsArray);
    });
  };
  const handlePurchase = () => {
    setAlert(!alert);
  };
  const viewTotalPrice = () => {
    let totalPrice = 0;
    for (var i = 0; i < productData.length; i++) {
      totalPrice = totalPrice + productData[i].price * productData[i].quantity;
    }
    setPrice(totalPrice);
    // console.log(productData);
  };

  return (
    <div className="container">
      <header className="headerPink">
        <h1>Checkout</h1>
      </header>
      <hr className="hrMain" />
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {productData ? (
            productData.map((product) => (
              <tr>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>RS.{product.price}</td>
              </tr>
            ))
          ) : (
            <>Loading...</>
          )}
        </tbody>
      </table>
      <div className="align-right">RS.{price}</div>
      <div className="row">
        <div className="align-right col-md-6 margin-bottom-mobile">
          <span onClick={viewTotalPrice}>
            <CustomButton
              title={"Reveal Total Price"}
              color={"#fff"}
              background={"#f01130"}
              width={"300px"}
            />
          </span>
        </div>
        <div className="align-right col-md-6">
          <span onClick={handlePurchase}>
            <CustomButton
              title={"Proceed To Pay"}
              color={"#fff"}
              background={"#f01130"}
              width={"300px"}
            />
          </span>
        </div>
      </div>
      {alert ? (
        <div className="error-display">
          <Dialog
            open={alert}
            onClose={handlePurchase}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              className="headerModalCheckout"
            >
              <FontAwesomeIcon icon={faTriangleExclamation} /> Couldn't proceed
              to pay!
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This is a ReactJs portfolio website, developed to showcase my
                development skills so you can't purchase products
                <br />—<b>Thanks for understanding</b>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePurchase} autoFocus>
                I Understand
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default memo(Checkout);
