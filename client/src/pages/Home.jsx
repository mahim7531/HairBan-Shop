import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const [productsRes, categoriesRes] = await Promise.all([api.get('/products'), api.get('/products/categories')]);
      setProducts(productsRes.data.slice(0, 6));
      setCategories(categoriesRes.data);
    };
    load();
  }, []);

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a75d3b]">Luxury Hair Buns & Accessories</p>
          <h1 className="mb-6 text-5xl leading-tight text-stone-800 md:text-6xl">Elegant buns crafted for every glow.</h1>
          <p className="mb-8 max-w-xl text-lg text-stone-600">Discover premium artificial hair buns, extensions, and accessories designed with soft glamour and timeless beauty.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="rounded-full bg-stone-800 px-6 py-3 text-white">Shop Collection</Link>
            <Link to="/about" className="rounded-full border border-stone-300 px-6 py-3 text-stone-700">Explore Brand</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2rem] border border-stone-200 bg-white/70 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.3)]">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[#f8e8de] to-[#f2d2c3] p-6">
            <div className="mb-6 h-64 rounded-[1.25rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.8),_transparent_50%),linear-gradient(135deg,_#d8a98f,_#b56b4f)]" />
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-stone-600">New Arrival</p>
                <h2 className="text-3xl text-stone-800">Velvet Rose Bun</h2>
              </div>
              <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium">Best Seller</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl text-stone-800">Featured Products</h2>
          <Link to="/shop" className="text-sm text-[#a75d3b]">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <motion.article key={product._id} whileHover={{ y: -6 }} className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm">
              <div className="h-48 bg-gradient-to-br from-[#f7e6dc] to-[#f1d0bf]" />
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-500">{product.category?.name || 'Hair Bun'}</p>
                  <span className="rounded-full bg-[#f7e8dd] px-3 py-1 text-xs text-[#a75d3b]">{product.bestseller ? 'Best Seller' : 'Trending'}</span>
                </div>
                <h3 className="text-xl text-stone-800">{product.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-stone-900">${product.discountPrice || product.price}</p>
                    <p className="text-sm text-stone-500">{product.stock} in stock</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/product/${product._id}`} className="rounded-full border border-stone-300 px-3 py-2 text-sm">View</Link>
                    <button onClick={() => { dispatch(addToCart(product)); toast.success('Added to cart'); }} className="rounded-full bg-stone-800 px-3 py-2 text-sm text-white">Add</button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl text-stone-800">Shop By Category</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <div key={category._id} className="rounded-[1.25rem] border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-24 rounded-[1rem] bg-gradient-to-br from-[#f7e6dc] to-[#f1d0bf]" />
              <h3 className="text-xl text-stone-800">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
