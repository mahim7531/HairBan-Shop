import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data));
  }, []);

  const filtered = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-stone-200 bg-white/70 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#a75d3b]">Curated Collection</p>
          <h1 className="text-4xl text-stone-800">Shop Hair Buns</h1>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for buns..." className="rounded-full border border-stone-300 px-4 py-3 outline-none" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <motion.article key={product._id} whileHover={{ y: -6 }} className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm">
            <div className="h-48 bg-gradient-to-br from-[#f7e6dc] to-[#f1d0bf]" />
            <div className="p-5">
              <h3 className="text-xl text-stone-800">{product.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-stone-900">${product.discountPrice || product.price}</p>
                <div className="flex gap-2">
                  <Link to={`/product/${product._id}`} className="rounded-full border border-stone-300 px-3 py-2 text-sm">View</Link>
                  <button onClick={() => { dispatch(addToCart(product)); toast.success('Added to cart'); }} className="rounded-full bg-stone-800 px-3 py-2 text-sm text-white">Add</button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}
