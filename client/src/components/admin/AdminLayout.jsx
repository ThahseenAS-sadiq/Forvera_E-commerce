import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children, setToken }) => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <div className="flex flex-col flex-1">
        {/* ✅ Forward setToken */}
        <AdminNavbar setToken={setToken} />

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


