import { useEffect, useState } from "react";
import { ShoppingBasket, Store, Tags, CircleDollarSign } from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState({
    products: 120,
    revenue: 45000,
    orders: 320,
    stores: 12,
  });

  const cards = [
    { title: "Products", value: data.products, icon: ShoppingBasket },
    { title: "Revenue", value: `$${data.revenue}`, icon: CircleDollarSign },
    { title: "Orders", value: data.orders, icon: Tags },
    { title: "Stores", value: data.stores, icon: Store },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.title} className="bg-white p-6 rounded-lg border flex justify-between">
            <div>
              <p className="text-sm text-slate-500">{c.title}</p>
              <h2 className="text-2xl font-bold">{c.value}</h2>
            </div>
            <c.icon className="text-slate-400" size={40} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
