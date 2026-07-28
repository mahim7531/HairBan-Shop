import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="mb-8 text-4xl text-stone-800">Your Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.length === 0 ? <p className="rounded-[1.5rem] border border-stone-200 bg-white p-6">Your cart is empty.</p> : items.map((item) => (
            <div key={item._id} className="flex items-center justify-between rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm">
              <div>
                <h3 className="text-lg text-stone-800">{item.title}</h3>
                <p className="text-sm text-stone-600">${item.discountPrice || item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: Math.max(1, item.quantity - 1) }))} className="rounded-full border px-3 py-1">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))} className="rounded-full border px-3 py-1">+</button>
                <button onClick={() => dispatch(removeFromCart(item._id))} className="ml-3 text-sm text-[#a75d3b]">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl text-stone-800">Order Summary</h2>
          <div className="mt-6 space-y-2 text-stone-600">
            <div className="flex justify-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
          </div>
          <div className="mt-6 border-t border-stone-200 pt-4">
            <div className="flex justify-between text-lg font-semibold text-stone-800"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className="mt-6 w-full rounded-full bg-stone-800 px-4 py-3 text-white">Checkout</button>
          </div>
        </div>
      </div>
    </main>
  );
}
