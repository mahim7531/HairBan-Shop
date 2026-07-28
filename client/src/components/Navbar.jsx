import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingBag, FiHeart, FiUser } from 'react-icons/fi';
import { logout } from '../store/authSlice';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fffaf7]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link to="/" className="text-2xl font-semibold tracking-[0.25em] text-stone-800">HAIRBAN</Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-700 md:flex">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-[#a75d3b]' : ''}>Home</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? 'text-[#a75d3b]' : ''}>Shop</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'text-[#a75d3b]' : ''}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-[#a75d3b]' : ''}>Contact</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin" className={({ isActive }) => isActive ? 'text-[#a75d3b]' : ''}>Admin</NavLink>}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/cart" className="rounded-full border border-stone-300 p-2 text-stone-700">
            <FiShoppingBag />
            <span className="ml-1 text-xs">{items.length}</span>
          </Link>
          <Link to="/wishlist" className="rounded-full border border-stone-300 p-2 text-stone-700"><FiHeart /></Link>
          {user ? (
            <button onClick={() => dispatch(logout())} className="rounded-full bg-stone-800 px-4 py-2 text-sm text-white">Logout</button>
          ) : (
            <Link to="/login" className="rounded-full bg-stone-800 px-4 py-2 text-sm text-white"><FiUser className="inline mr-2" />Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
