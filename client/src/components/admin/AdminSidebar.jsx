import { NavLink } from "react-router-dom";
import { Home, PlusSquare, List, Package } from "lucide-react";

const links = [
  { name: "Dashboard", path: "/admin", icon: Home, end: true },
  { name: "Add Items", path: "/admin/add", icon: PlusSquare },
  { name: "List Items", path: "/admin/list", icon: List },
  { name: "Orders", path: "/admin/orders", icon: Package },
];

const AdminSidebar = () => {
  return (
    <aside className="w-60 min-h-screen border-r bg-white hidden sm:block">
      <nav className="mt-10 space-y-3"> {/* ✅ spacing between items */}
        {links.map(({ name, path, icon: Icon, end }) => (
          <NavLink
            key={name}
            to={path}
            end={end}  // ✅ THIS FIXES THE ACTIVE ISSUE
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-6 py-3 text-sm
              transition-colors
              ${
                isActive
                  ? "bg-pink-50 text-pink-500 font-medium border-r-2 border-pink-400"
                  : "text-slate-600 hover:bg-slate-100"
              }
              `
            }
          >
            <Icon size={18} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
