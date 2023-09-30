import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../../firebaseConfig";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useParams } from "react-router-dom";
import { useUserAuth } from "../../context/userContext";

const db = getDatabase(app);

// export const getAllProducts = () => {
//     const distanceRef = ref(db, "products/");
//     onValue(distanceRef, (snapshot) => {
//       const data = snapshot.val();
//       const productsArray = data ? Object.values(data) : [];
//     //   setProductData(productsArray);
//     return productsArray;
//     });
//   };
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const distanceRef = ref(db, "products/");
    onValue(distanceRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      return productsArray;
    });
  }
);
// const getProduct = () => {
//     const distanceRef = ref(db, `products/${ID + 1}`);
//     onValue(distanceRef, (snapshot) => {
//       const data = snapshot.val();
//       const productsArray = data ? Object.values(data) : [];
//       setProductData(productsArray);
//     });
//   };
export const getProduct = createAsyncThunk("products/getProduct", async () => {
  const { id } = useParams();
  const ID = parseInt(id);
  const distanceRef = ref(db, `products/${ID + 1}`);
  onValue(distanceRef, (snapshot) => {
    const data = snapshot.val();
    const productsArray = data ? Object.values(data) : [];
    return productsArray;
  });
});
// const getAllProducts = () => {
//     const distanceRef = ref(db, "users/" + user.uid + "/cart");
//     onValue(distanceRef, (snapshot) => {
//       const data = snapshot.val();
//       const productsArray = data ? Object.values(data) : [];
//       setProductData(productsArray);
//       const totalPrice = productData
//         ? productData.reduce(
//             (total, product) =>
//               total + parseInt(product.price) * parseInt(product.quantity),
//             0
//           )
//         : [];
//       console.log(totalPrice);
//       setPrice(totalPrice);
//     });
//   };
export const getAllCartProducts = createAsyncThunk(
  "cart/getAllCartProducts",
  async () => {
    const { user } = useUserAuth();
    const distanceRef = ref(db, "users/" + user.uid + "/cart");
    onValue(distanceRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      //   setProductData(productsArray);
      const totalPrice = productsArray
        ? productsArray.reduce(
            (total, product) =>
              total + parseInt(product.price) * parseInt(product.quantity),
            0
          )
        : [];
      console.log(totalPrice);
      //   setPrice(totalPrice);
      return [productsArray, totalPrice];
    });
  }
);
// const deleteItem = (id) => {
//     console.log(id);
//     let updatedArray;
//     const productRef = ref(db, "users/" + user.uid + "/cart/");
//     onValue(productRef, (snapshot) => {
//       const data = snapshot.val();
//       const productsArray = data ? Object.values(data) : [];
//       updatedArray = productsArray.filter((p) => p.prodId !== id);
//     });
//     set(productRef, updatedArray)
//       .then(() => {
//         console.log("Product deleted successfully.");
//       })
//       .catch((error) => {
//         console.error("Error deleting product:", error);
//       });
//     getAllProducts();
//   };
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    console.log(id);
    const { user } = useUserAuth();
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
  }
);

const initialState = {
  productData: [],
  size: "",
  style: "",
  quantity: null,
  images: "",
  price: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setStyle: (state, action) => {
      state.style = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setImage: (state, action) => {
      state.images = action.payload;
    },
  },
  extraReducers: {
    [getAllProducts.fulfilled]: (state, { payload }) => {
      return { ...state, productData: payload };
    },
    [getProduct.fulfilled]: (state, { payload }) => {
      return { ...state, productData: payload };
    },
    [getAllCartProducts.fulfilled]: (state, { payload }) => {
      return { ...state, productData: payload[0], price: payload[1] };
    },
    [deleteCartItem.fulfilled]: (state, { payload }) => {
        return { ...state};
      },
  },
});

export const getProducts = (state) => state.products.productData;
export default productSlice.reducer;