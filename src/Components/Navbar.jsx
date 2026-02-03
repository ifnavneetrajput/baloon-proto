import { useNavigate, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import baloonPurpleLogo from "../assets/baloon-purple-logo.svg";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return (
    <nav className="flex items-center justify-between h-16 px-6 md:px-10 bg-transparent">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-purple-700 focus:outline-none"
        >
          <FaBars size={20} />
        </button>

        <img
          src={baloonPurpleLogo}
          alt="Baloon"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {isHome && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1.5 rounded-full border border-purple-600 text-purple-600 text-sm hover:bg-purple-50 transition"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-1.5 rounded-full bg-purple-600 text-white text-sm hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
