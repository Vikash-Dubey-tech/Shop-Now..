// import React from 'react';

// // React.memo ensures this component ONLY re-renders if its own props change
// const ProductCard = React.memo(({ product, onAddToCart, onOpenModal }) => {
//     const isOutOfStock = product.stock === 0;

//     return (
//         <div className="product-card">
//             {/* Clicking the image now opens the modal */}
//             <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 className="product-img"
//                 onClick={() => onOpenModal(product)}
//                 style={{ cursor: 'pointer' }}
//             />
            
//             {/* 1. Show Product Image from API */}
//            {/* // <img src={product.thumbnail} alt={product.title} className="product-img" /> */}

//             <div className="product-info">
//                 <h3>{product.title}</h3>
//                 <p className="category">{product.category}</p>
//                 <p className="price">${product.price}</p>

//                 {/* 2. Stock Status Edge Case */}
//                 <p className={`stock-status ${isOutOfStock ? 'out' : 'in'}`}>
//                     {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
//                 </p>

//                 {/* 3. Button Rule: Disabled if out of stock */}
//                 <button
//                     className="add-btn"
//                     disabled={isOutOfStock}
//                     onClick={() => onAddToCart(product)}
//                 >
//                     {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
//                 </button>
//             </div>
//         </div>
//     );
// });

// export default ProductCard;

import React from 'react';

// React.memo ensures this component ONLY re-renders if its own props change
const ProductCard = React.memo(({ product, onAddToCart, onOpenModal }) => {
    // 1. Handling Edge Case: Disable button if stock is 0
    const isOutOfStock = product.stock === 0;

    return (
        <div className="product-card">
            {/* FIXED: Only one image tag here. 
                Clicking the image triggers the modal bonus feature.
            */}
            <img
                src={product.thumbnail}
                alt={product.title}
                className="product-img"
                onClick={() => onOpenModal(product)}
                style={{ cursor: 'pointer' }}
            />
            
            <div className="product-info">
                <h3 onClick={() => onOpenModal(product)} style={{ cursor: 'pointer' }}>
                    {product.title}
                </h3>
                <p className="category">{product.category}</p>
                <p className="price">${product.price}</p>

                {/* 2. Stock Status Requirement */}
                <p className={`stock-status ${isOutOfStock ? 'out' : 'in'}`}>
                    {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
                </p>

                {/* 3. Button Rule: Disabled if out of stock */}
                <button
                    className="add-btn"
                    disabled={isOutOfStock}
                    onClick={(e) => {
                        // Prevent modal from opening when clicking the button
                        e.stopPropagation(); 
                        onAddToCart(product);
                    }}
                >
                    {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
});

export default ProductCard;