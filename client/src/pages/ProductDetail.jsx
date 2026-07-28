import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="mx-auto max-w-7xl px-4 py-12">Loading...</div>;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="grid gap-8 rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-sm lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-96 rounded-[1.5rem] bg-gradient-to-br from-[#f7e6dc] to-[#f1d0bf]" />
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#a75d3b]">Featured Detail</p>
          <h1 className="mt-2 text-4xl text-stone-800">{product.title}</h1>
          <p className="mt-4 text-stone-600">{product.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <p className="text-2xl font-semibold text-stone-900">${product.discountPrice || product.price}</p>
            <span className="rounded-full bg-[#f7e8dd] px-3 py-1 text-sm text-[#a75d3b]">{product.stock} left</span>
          </div>
          <button onClick={() => { dispatch(addToCart(product)); toast.success('Added to cart'); }} className="mt-8 rounded-full bg-stone-800 px-6 py-3 text-white">Add to Cart</button>
        </div>
      </div>
    </main>
  );
}
