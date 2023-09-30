import React, { useEffect, useState } from "react";
import websiteBanner from "../assets/img/websitebanner.jpg";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../utils/CustomButton";
import { app } from "../firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database";
// import { useUserAuth } from "../context/userContext";
// import { useDispatch, useSelector } from "react-redux";
// import {getAllProducts, getProducts} from "../features/products/productSlice";


const Home = () => {
  // const { user } = useUserAuth();
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const db = getDatabase(app);
// const productData = useSelector(getProducts);
  const [productData, setProductData] = useState();

  const getAllProducts = () => {
    const distanceRef = ref(db, "products/");
    onValue(distanceRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      setProductData(productsArray);
    });
  };
  useEffect(() => {
    getAllProducts();
    // dispatch(getAllProducts());
  }, []);
  return (
    <main>
      {!productData ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <img src={websiteBanner} alt="banner" className="imageBannerHome" />
          <div className="description">
            <p>
              Welcome to Pop Nosh - your home to Gourmet Popcorn, Soft Serve,
              and Nuts. We are the proud pioneers of the Original Gourmet
              Popcorn and Gourmet Soft Serve Cones in Pakistan. Our countless
              Hand-Made flavors will boost your cravings and leave you wanting
              for more and more.
            </p>
          </div>
          <header className="headerPink">
            <h1>Signature Popcorn</h1>
          </header>
          <hr className="hrMain" />
          <div className="mainCategoriesDisplay container">
            <Link to={"/shop"}>
              <div className="item1">
                <div className="item-btn">
                  <Link to="shop">Classic</Link>
                </div>
              </div>
            </Link>
            <Link to={"/shop"}>
              <div className="item2">
                <div className="item-btn">
                  <Link to="shop">Savory</Link>
                </div>
              </div>
            </Link>
            <Link to={"/shop"}>
              <div className="item3">
                <div className="item-btn">
                  <Link to="shop">Premium</Link>
                </div>
              </div>
            </Link>
          </div>
          <header className="headerPink">
            <h1>Retail Popcorn</h1>
          </header>
          <hr className="hrMain" />

          <div className="container container-products-home">
            <div class="row retail-popcorn">
              <div class="col-md-8 product">
                <div class="imageMainPage">
                  <Link to={`/product/0`}>
                    <img
                      src={productData[0].productImg[0]}
                      alt="chocolate popcorn"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <p class="desc0">
                  {productData[0].productName} - RS.
                  {productData[0].productVariation.Variation1.price}
                </p>
              </div>

              <div class="col-md-4 d-flex flex-column">
                <div class="product">
                  <div class="imageMainPage">
                    <Link to={`/product/1`}>
                      <img
                        src={productData[1].productImg[0]}
                        alt="2"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <p class="desc0">
                    {productData[1].productName} - RS.
                    {productData[1].productVariation.Variation1.price}
                  </p>
                </div>
                <div class="product">
                  <div class="imageMainPage">
                    <Link to={`/product/2`}>
                      <img
                        src={productData[2].productImg[0]}
                        alt="3"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <p className="desc0">
                    {productData[2].productName} - RS.
                    {productData[2].productVariation.Variation1.price}
                  </p>
                </div>
              </div>
            </div>

            <div class="row retail-popcorn">
              <div class="col-md-4 d-flex flex-column">
                <div class="product">
                  <div class="imageMainPage">
                    <Link to={`/product/3`}>
                      <img
                        src={productData[3].productImg[0]}
                        alt="3"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <p class="desc0">
                    {productData[3].productName} - RS.
                    {productData[3].productVariation.Variation1.price}
                  </p>
                </div>
                <div class="product">
                  <div class="imageMainPage">
                    <Link to={`/product/4`}>
                      <img
                        src={productData[4].productImg[0]}
                        alt="4"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <p className="desc0">
                    {productData[4].productName} - RS.
                    {productData[4].productVariation.Variation1.price}
                  </p>
                </div>
              </div>

              <div class="col-md-8 product">
                <div class="imageMainPage">
                  <Link to={`/product/5`}>
                    <img
                      src={productData[5].productImg[0]}
                      alt="chocolate popcorn"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <p class="desc0">
                  {productData[5].productName} - RS.
                  {productData[5].productVariation.Variation1.price}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="products-grid-main">
            <div className="grid-left-right">
              <div className="left">
                <Link to={`/product/0`}>
                  <img
                    src={productData[0].productImg[0]}
                    alt="chocolate popcorn"
                    loading="lazy"
                    className="widthAdjust"
                  />
                </Link>
                <p className="desc0">
                  {productData[0].productName} - RS.
                  {productData[0].productVariation.Variation1.price}
                </p>
              </div>
              <div className="right">
                <div className="product">
                  <Link to={`/product/1`}>
                    <img
                      src={productData[1].productImg[0]}
                      alt="2"
                      loading="lazy"
                    />
                  </Link>
                  <p className="desc">
                    {productData[1].productName} - RS.
                    {productData[1].productVariation.Variation1.price}
                  </p>
                </div>
                <div className="product">
                  <Link to={`/product/2`}>
                    <img
                      src={productData[2].productImg[0]}
                      alt="3"
                      loading="lazy"
                    />
                  </Link>
                  <p className="desc">
                    {productData[2].productName} - RS.
                    {productData[2].productVariation.Variation1.price}
                  </p>{" "}
                </div>
              </div>
            </div>

            <div className="grid-right-left">
              <div className="left">
                <div className="product">
                  <Link to={`/product/3`}>
                    <img
                      src={productData[3].productImg[0]}
                      alt="2"
                      loading="lazy"
                    />
                  </Link>
                  <p className="desc">
                    {productData[3].productName} - RS.
                    {productData[3].productVariation.Variation1.price}
                  </p>
                </div>
                <div className="product">
                  <Link to={`/product/4`}>
                    <img
                      src={productData[4].productImg[0]}
                      alt="3"
                      loading="lazy"
                    />
                  </Link>
                  <p className="desc">
                    {productData[4].productName} - RS.
                    {productData[4].productVariation.Variation1.price}
                  </p>
                </div>
              </div>
              <div className="right">
                <Link to={`/product/5`}>
                  <img
                    src={productData[5].productImg[0]}
                    loading="lazy"
                    alt="chocolate popcorn"
                    className="widthAdjust"
                  />
                </Link>
                <p className="desc">
                  {productData[5].productName} - RS.
                  {productData[5].productVariation.Variation1.price}
                </p>
              </div>
            </div>
          </div> */}
          <header className="headerPink">
            <h1>Featured Best Seller</h1>
          </header>
          <hr className="hrMain" />

          <div className="container">
            <div className="row">
              <div className="image col-md-6">
                <Link to={`/product/6`}>
                  <img
                    src={productData[6].productImg[0]}
                    alt="best seling"
                    loading="lazy"
                  />
                </Link>
              </div>

              <div className="product-info col-md-6">
                <header className="headerPink">
                  <h1>{productData[0].productName}</h1>
                </header>
                <p className="pinkColor">
                  RS.{productData[6].productVariation.Variation1.price}
                </p>
                <p>Tax included.</p>
                <hr className="hrMain" />
                <p className="gap">Size</p>
                <CustomButton
                  title={"PERSONAL TIN"}
                  color={"#f01130"}
                  background={"#fff"}
                  width={"150px"}
                />
                <p className="marginAndWidth">
                  <p className="btnW" onClick={()=> {navigate("/product/6")}}>
                    <CustomButton
                      title={"ADD TO CART"}
                      color={"#f01130"}
                      background={"#fff"}
                      width={window.innerWidth > "786" ? '200px' : "130px"}
                    />
                  </p>
                  <p className="btnW" onClick={()=> {navigate("/product/6")}}>
                    <CustomButton
                      className="btnW"
                      title={"BUY IT NOW"}
                      color={"#FFF"}
                      background={"#f01130"}
                      width={window.innerWidth > "786" ? '200px' : "130px"}
                    />
                  </p>
                </p>
              </div>
            </div>
          </div>

          <div className="newsletter">
            <header className="headerPink">
              <h1>Subscribe to our newsletter</h1>
            </header>
            <p>Promotions, new products and sales. Directly to your inbox.</p>
            <hr className="hrMain" />
            <div className="emailInput">
              <input
                placeholder="Your Email"
                type="email"
                name="email"
                id="email"
                className="email"
              />
              <CustomButton
                className="btnW"
                title={"SUBSCRIBE"}
                color={"#FFF"}
                background={"#f01130"}
                width={"150px"}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
