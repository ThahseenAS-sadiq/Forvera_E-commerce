import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccouncementBar from "../components/AccouncementBar";
import SearchBar from "../components/SearchBar";

const UserLayout = () => {
  return (
    <>
      <AccouncementBar />
      <Navbar />
      <SearchBar />

      <Outlet /> {/* 👈 renders user pages */}

      <Footer />
    </>
  );
};

export default UserLayout;

