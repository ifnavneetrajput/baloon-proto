import { NavLink } from "react-router-dom";
import { FaHome, FaRoute, FaVideo, FaPlusCircle } from "react-icons/fa";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `group flex items-center gap-4 px-4 py-3 rounded-lg text-sm transition-all duration-300
     ${
       isActive
         ? "bg-pink-100 text-pink-600 font-medium"
         : "text-gray-600 hover:bg-gray-100"
     }`;

  return (
    <aside
      className="
        group
        bg-white
        border-r
        border-gray-200
        sticky
        top-16
        h-[calc(100vh-64px)]
        w-16 hover:w-64
        transition-all duration-300
        overflow-hidden
      "
    >
      <nav className="flex flex-col gap-1 px-2 py-4">
        <NavLink to="/home" className={linkClass}>
          <FaHome className="text-base min-w-[20px]" />
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
            Home
          </span>
        </NavLink>

        <NavLink to="/journey" className={linkClass}>
          <FaRoute className="text-base min-w-[20px]" />
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
            Journey
          </span>
        </NavLink>

        <NavLink to="/main" className={linkClass}>
          <FaVideo className="text-base min-w-[20px]" />
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
            Explore
          </span>
        </NavLink>

        <NavLink to="/participate" className={linkClass}>
          <FaPlusCircle className="text-base min-w-[20px]" />
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
            Participate
          </span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
