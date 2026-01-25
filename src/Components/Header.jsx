import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import baloonWordMark from "../assets/baloon_word_mark_.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/journey") {
      navigate("/journey");
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 border-b bg-white">
 
      <img
        src={baloonWordMark}
        alt="Baloon logo"
        className="h-8 cursor-pointer hover:opacity-80 transition"
        onClick={handleLogoClick}
      />

      <button
        onClick={handleLogout}
        className="bg-pink-600 text-white px-4 py-1 rounded-full text-sm hover:bg-pink-700 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
