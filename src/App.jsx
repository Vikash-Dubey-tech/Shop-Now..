import { useState, useEffect, useMemo, useCallback } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import './App.css';
import Modal from './components/Modal';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = useCallback((product) => {
    setSelectedProduct(product);
  }, []);


  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('mini-store-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('mini-store-cart', JSON.stringify(cart));
  }, [cart]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 3. THE API CALL (Effect)
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  // 4. THE LOGIC (Filters & Add to Cart)
  const filteredProducts = useMemo(() => {
    let result = [...products]; 

    // 1. Filter by Search Term
    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 2. Filter by Category
    if (category !== "All") {
      result = result.filter(p => p.category === category);
    }

    // 3. Sort by Price
    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sortOrder]);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // 1. Remove item from cart
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // 2. Increase or Decrease quantity
  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // 5. THE UI (The "return" statement)
  return (
    <div className="app-container">
      <header className="header">
        <h1>Shop Now <span className="cart-badge"></span></h1>
        <div className="filters">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filter */}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
          </select>

          {/* NEW: Sort Filter */}
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="none">Sort by Price</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>

          {/* Clear All Button (Required for high marks!) */}
          <button onClick={() => { setSearch(""); setCategory("All"); setSortOrder("none"); }}>
            Clear Filters
          </button>
        </div>
      </header>

      <main className="shop-layout">
        <section className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart}
              onOpenModal={setSelectedProduct}
               />
            ))
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </section>

        {/* This is where your Cart Sidebar will go next */}
        {/* RIGHT SIDE: The Cart (PASTE IT HERE) */}
        <aside className="cart-sidebar">
          <h2>Your Cart</h2>
          <Cart
            cartItems={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        </aside>
      </main>
    
    </div>
  );
}

export default App;