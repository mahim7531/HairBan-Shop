import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { loginSuccess } from '../store/authSlice';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      dispatch(loginSuccess(res.data));
      toast.success('Account created');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 lg:px-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl text-stone-800">Register</h1>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mb-4 w-full rounded-full border border-stone-300 px-4 py-3" placeholder="Name" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mb-4 w-full rounded-full border border-stone-300 px-4 py-3" placeholder="Email" />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mb-4 w-full rounded-full border border-stone-300 px-4 py-3" placeholder="Password" />
        <button className="w-full rounded-full bg-stone-800 px-4 py-3 text-white">Create Account</button>
        <p className="mt-4 text-sm text-stone-600">Already have an account? <Link to="/login" className="text-[#a75d3b]">Login</Link></p>
      </form>
    </main>
  );
}
