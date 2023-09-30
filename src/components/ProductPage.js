import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import CustomButton from "../utils/CustomButton";
import { app } from "../firebaseConfig";
import { useUserAuth } from "../context/userContext";
import { getDatabase, onValue, ref, set, update } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";

const ProductPage = ({setIsCartOpen}) => {
  const { user } = useUserAuth();
  const [size, setSize] = useState("60");
  const [style, setStyle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  let imgs = [];
  const { id } = useParams();
  const ID = parseInt(id);
  const db = getDatabase(app);
  const [productData, setProductData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
    console.log(user);
    window.addEventListener("beforeunload", onPageLeave);
    return () => {
      window.removeEventListener("beforeunload", onPageLeave);
    };
  }, []);

  useEffect(() => {
    if (productData && Array.isArray(productData[3])) {
      imgs = productData[3].map((url) => ({
        original: url,
        thumbnail: url,
      }));
      setImages(imgs);
    }
  }, [productData]);

  const getProduct = () => {
    const distanceRef = ref(db, `products/${ID + 1}`);
    onValue(distanceRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      setProductData(productsArray);
    });
  };

  const onPageLeave = () => {
    setSize("");
    setStyle("");
    setQuantity(1);
    setImages([]);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const increaseQuantity = () => {
    if (quantity < 20) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  function writeUserCartData(productName, style, quantity, buyItNow) {
    const Price =
      style === productData[5].Variation1.pack
        ? productData[5].Variation1.price
        : productData[5].Variation2.price
        ? productData[5].Variation2.price
        : productData[5].Variation1.price;

    if (user) {
      const db = getDatabase(app);
      const reference = ref(db, "users/" + user.uid + "/cart");

      let existingData = [];
      let productAlreadyExists = false;
      onValue(reference, (snapshot) => {
        const Data = snapshot.val();
        existingData = Data ? Object.values(Data) : [];
      });
      existingData.map((product, index) => {
        if (productName === product.productName) {
          alert("Product already exists in cart!");
          productAlreadyExists = true;
        }
      });
      if (productAlreadyExists) {
        return;
      }
      const prodId = parseInt(Math.random() * 10000);
      const newUserCartIndex = existingData.length;
      existingData[newUserCartIndex] = {
        prodId,
        image: images[0].original,
        productName,
        price: Price,
        style,
        quantity,
      };
      set(reference, existingData);
      if (buyItNow) {
        navigate("/checkout");
      }
      setIsCartOpen(true);
    } else {
      return alert("Please SignIn to Add Product to Cart.");
    }
  }
  if (!productData) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <ImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            items={images}
          />
        </div>
        <div className="col-md-5 centerAlign">
          <header className="headerPink">
            <h1>{productData[4]}</h1>
          </header>
          {style === productData[5].Variation1.pack ? (
            <p className="pinkColor">RS.{productData[5].Variation1.price}</p>
          ) : (
            <p className="pinkColor">
              RS.
              {productData[5].Variation2
                ? productData[5].Variation2.price
                : 2520}
            </p>
          )}
          <p>Tax Included</p>
          <hr className="hrMain" />

          <p>Size: {size}g</p>
          <select value={size} onChange={handleSizeChange}>
            <option value="">Choose One</option>
            <option value="60">60g</option>
          </select>

          <p>Style: {style}</p>
          {productData[5].Variation2 ? (
            <select value={style} onChange={handleStyleChange}>
              <option
                defaultValue={productData[5].Variation1.pack}
                value={productData[5].Variation1.pack}
              >
                {productData[5].Variation1.pack}
              </option>
              <option value={productData[5].Variation2.pack}>
                {productData[5].Variation2.pack}
              </option>
            </select>
          ) : (
            <select value={style} onChange={handleStyleChange}>
              <option value={productData[5].Variation1.pack}>
                {productData[5].Variation1.pack}
              </option>
            </select>
          )}

          <p>
            <p>Quantity</p>
            <button onClick={decreaseQuantity}>-</button>
            <input
              type="text"
              name="quantity"
              id="quantity"
              disabled
              defaultValue={quantity}
              value={quantity}
            />
            <button onClick={increaseQuantity}>+</button>
          </p>
          <p className="marginBetweenAndTop">
            <span
              onClick={() =>
                writeUserCartData(productData[4], style, quantity, false)
              }
            >
              <CustomButton
                margin={10}
                title={"ADD TO CART"}
                color={"#f06060"}
                background={"#fff"}
                width={window.innerWidth > 768 ? "150px" : "130px"}
              />
            </span>
            <span
              onClick={() =>
                writeUserCartData(productData[4], style, quantity, true)
              }
            >
              <CustomButton
                margin={10}
                title={"BUY IT NOW"}
                color={"#fff"}
                background={"#f06060"}
                width={window.innerWidth > 768 ? "150px" : "130px"}
              />
            </span>
          </p>

          <p className="description">{productData[2]}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 customerReviews">
          <header className="headerPink">
            <h3>Customer Reviews</h3>
          </header>
          <p>No Reviews Yet</p>
          <header className="headerPink adjustMargin">Write a review</header>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
