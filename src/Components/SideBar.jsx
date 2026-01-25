import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaRoute,
  FaVideo,
  FaPlusCircle,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ mobile = false, onClose }) => {
  const linkClass = ({ isActive }) =>
    `group flex items-center gap-4 px-4 py-3 rounded-lg text-sm
     transition-all duration-300
     ${
       isActive
         ? "bg-pink-100 text-pink-600 font-medium"
         : "text-gray-600 hover:bg-gray-100"
     }`;

  return (
    <aside
      className={`
        bg-white border-r border-gray-200
        ${mobile ? "w-64 h-full" : "w-64"}
        transition-all duration-300
      `}
    >
      {mobile && (
        <div className="flex justify-end p-4">
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>
      )}

      <nav className="flex flex-col gap-1 px-2 py-4">
        {[
          { to: "/home", icon: <FaHome />, label: "Home" },
          { to: "/journey", icon: <FaRoute />, label: "Journey" },
          { to: "/main", icon: <FaVideo />, label: "Explore" },
          { to: "/participate", icon: <FaPlusCircle />, label: "Participate" },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={linkClass}
            onClick={mobile ? onClose : undefined}
          >
          
            <span
              className="
                text-base
                transition-transform duration-300
                group-hover:scale-110
              "
            >
              {icon}
            </span>

          
            <span
              className="
                transition-all duration-300
                group-hover:translate-x-1
              "
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
