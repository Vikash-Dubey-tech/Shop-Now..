import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemove }) => {
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 
    0
  );

  return (
    <div className="cart-content">
      {cartItems.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p> // Empty state requirement
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                
                <div className="cart-controls">
                  {/* Rule: Quantity cannot exceed available stock */}
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  > - </button>
                  
                  <span>{item.quantity}</span>
                  
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    disabled={item.quantity >= item.stock}
                  > + </button>
                  
                  <button 
                    className="remove-btn" 
                    onClick={() => onRemove(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-footer">
            <hr />
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;