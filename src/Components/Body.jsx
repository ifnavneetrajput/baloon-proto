import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideBar";
import { useState } from "react";

const Body = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setOpen(true)} />

      <div className="flex">
     
        <div className="hidden md:block">
          <Sidebar />
        </div>

 
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 md:hidden">
              <Sidebar mobile onClose={() => setOpen(false)} />
            </div>
          </>
        )}

        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Body;
