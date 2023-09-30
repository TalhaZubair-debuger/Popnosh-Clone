import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { app } from '../firebaseConfig';
import { getDatabase, onValue, ref } from 'firebase/database';


const Gifts = () => {
    const db = getDatabase(app);
    const [productData, setProductData] = useState();
    const getAllProducts = () => {
        const distanceRef = ref(db, `products/`);
        onValue(distanceRef, (snapshot) => {
            const data = snapshot.val();
            const productsArray = data ? Object.values(data) : [];
            setProductData(productsArray);
        })
    }
    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <div className="container">
            {
                !productData ?
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    <>
                        <header className='headerPink'>
                            <h1>Gifts</h1>
                        </header>
                        <hr className='hrMain' />
                        <div className="row">
                            {
                                productData.map(product =>
                                    <div className="col-md-4" key={product.id}>
                                        <Link className='textDecorationNone' to={`/product/${product.id}`}>
                                            <img src={product.productImg[0]} alt="" className='productPageImage' />
                                            <h6>{product.productName} — RS.{product.productVariation.Variation1.price}</h6>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </>
            }
        </div >
    )
}

export default memo(Gifts)