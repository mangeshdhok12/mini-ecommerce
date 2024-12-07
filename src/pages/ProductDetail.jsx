// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import axios from "axios";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
//       setProduct(res.data);
//     });
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="container product-detail">
//       <img src={product.image} alt={product.title} className="product-image" />
//       <div>
//         <h1>{product.title}</h1>
//         <p>{product.description}</p>
//         <p className="product-price">${product.price}</p>
//         <button onClick={() => addToCart(product)} className="add-to-cart">
//           Add to Cart
//         </button>
//         <Link to="/" className="back-link">
//           Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart, removeFromCart } = useCart(); // Include removeFromCart
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    // Fetch the product details
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  useEffect(() => {
    // Check if the product is already in the cart
    setIsInCart(cart.some((item) => item.id === parseInt(id)));
  }, [cart, id]);

  if (!product) return <p>Loading...</p>;

  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(product.id); // Remove from cart
    } else {
      addToCart(product); // Add to cart
    }
  };

  return (
    <div className="container product-detail">
      <img src={product.image} alt={product.title} className="product-image" />
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p className="product-price">${product.price}</p>
        <button
  onClick={handleCartAction}
  className={`cart-action-button ${isInCart ? "remove-from-cart" : ""}`}
>
  {isInCart ? "Remove from Cart" : "Add to Cart"}
</button>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
