import { assets } from "../../assets/assets.js";

const AdminNavbar = ({ setToken }) => {

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b bg-white">
      
      {/* Logo + Admin text */}
      <div className="flex items-center gap-3">
        <img
          src={assets.logo}
          alt="Admin Logo"
          className="h-20 w-36 object-contain"
        />
        <h1 className="text-xl font-semibold text-slate-700">
          Admin
        </h1>
      </div>

      {/* Right side */}
      <button
        onClick={logoutHandler}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminNavbar;



