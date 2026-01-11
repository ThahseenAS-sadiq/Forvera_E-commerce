import { useState } from "react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-pink-950 text-white text-md py-2 px-4 flex items-center justify-between">
      <p className="text-center flex-1">
        Free Shipping on Orders Over ₹2500 |{" "}
        <b>NEW CUSTOMERS GET 20% OFF</b> with code{" "}
        <b>WELCOME20...</b>
      </p>

      <i
        className="fa-solid fa-xmark cursor-pointer ml-4"
        onClick={() => setVisible(false)}
      ></i>
    </div>
  );
};

export default AnnouncementBar;
