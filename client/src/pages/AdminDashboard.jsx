import { useEffect, useState } from 'react';
import api from '../utils/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0, categories: 0 });

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setStats(res.data));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="mb-8 text-4xl text-stone-800">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: 'Products', value: stats.products },
          { label: 'Orders', value: stats.orders },
          { label: 'Customers', value: stats.users },
          { label: 'Revenue', value: `$${stats.revenue}` },
          { label: 'Categories', value: stats.categories },
        ].map((item) => (
          <div key={item.label} className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">{item.label}</p>
            <h2 className="mt-2 text-3xl text-stone-800">{item.value}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
