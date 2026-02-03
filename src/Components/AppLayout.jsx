import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar1 from "./Sidebar1";
import Navbar from "./Navbar";
import Home1 from "./Home1";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // useEffect(() => {
  //   if (window.innerWidth >= 768) {
  //     setSidebarOpen(true);
  //   }
  // }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#eafbf5] to-[#efe7fb] overflow-x-hidden">
      <Sidebar1 open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-16" : "md:ml-0"
        }`}
      >
        <Navbar onMenuClick={() => setSidebarOpen((p) => !p)} />
        <Home1 />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;
