
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  if (cart.length === 0)
    return <p className="empty-cart">Your cart is empty!</p>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutMessage(true); // Show the message
    // Simulate checkout process (e.g., API call)
    setTimeout(() => {
      setCheckoutMessage(false); // Hide the message after some time (optional)
    }, 3000); // Message disappears after 3 seconds
  };

  return (
    <div className="container cart">
      <h1 className="cart-heading">Your Cart</h1>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>
                ${item.price} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </p>
              <div className="quantity-controls">
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  className="decrement-button"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  className="increment-button"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2 className="cart-total">Total: ${total.toFixed(2)}</h2>
      <div className="checkout-container">
  <button className="cart-action-button checkout" onClick={handleCheckout}> Checkout</button>
  
</div>
<div>{checkoutMessage && (
          <p className="checkout-message">Your order is being processed...</p>
        )}</div>
    </div>
  );
};

export default Cart;
