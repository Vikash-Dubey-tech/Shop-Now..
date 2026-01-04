import React from 'react';

const Modal = ({ product, onClose }) => {
  if (!product) return null; // Don't render if no product is selected

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          <img src={product.thumbnail} alt={product.title} className="modal-img" />
          <div className="modal-details">
            <h2>{product.title}</h2>
            <p className="modal-category">{product.category}</p>
            <p className="modal-desc">{product.description}</p>
            <p className="modal-price">${product.price}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;