import {
  FaHome,
  FaPlay,
  FaStore,
  FaComments,
  FaUsers,
  FaSlidersH,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar1 = ({ open }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-purple-200 z-40
      transition-all duration-300 ease-in-out
      ${open ? "w-16" : "w-0"} overflow-hidden`}
    >
      <div className="flex flex-col items-center justify-evenly h-full py-20">
        <Icon icon={<FaHome size={22} />} />
        <Icon icon={<FaPlay size={22} />} />
        <Icon icon={<FaStore size={22} />} />
        <Icon icon={<FaComments size={22} />} />
        <Icon icon={<FaUsers size={22} />} />
        <Icon icon={<FaSlidersH size={22} />} />
        <Icon icon={<FaSignOutAlt size={22} />} />
      </div>
    </aside>
  );
};

const Icon = ({ icon }) => (
  <div className="text-purple-600 hover:text-purple-800 p-2 rounded-lg cursor-pointer transition hover:bg-purple-50">
    {icon}
  </div>
);

export default Sidebar1;
