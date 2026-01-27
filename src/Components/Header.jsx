import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import baloonWordMark from "../assets/baloon_word_mark_.svg";
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Profile from "./Profile";
const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
 // const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-gray-700">
          <FaBars size={18} />
        </button>

        <img
          src={baloonWordMark}
          alt="Baloon"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/home")}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="text-gray-600 hover:text-pink-600 transition"
        >
          <FaUserCircle size={22} />
        </button>

        <button
          onClick={handleLogout}
          className="bg-pink-600 text-white px-4 py-1 rounded-full text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
