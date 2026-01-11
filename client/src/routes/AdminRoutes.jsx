import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Add from "../pages/admin/Add";
import Orders from "../pages/admin/Orders";
import List from "../pages/admin/List";
import Login from "../components/admin/Login"; 
import { useEffect, useState } from "react";

export const backendURL = import.meta.env.VITE_BACKEND_URL
export const Currency = '₹' 

const AdminRoutes = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  },[token])
  return (
    <>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <AdminLayout setToken={setToken}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="/list" element={<List token={token} />} />
          </Routes>
        </AdminLayout>
      )}
    </>
  );
};

export default AdminRoutes;

