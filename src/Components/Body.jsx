import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Body = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <Header />

      <div className="flex">
 
        <div className="hidden md:block">
          <Sidebar />
        </div>

        
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Body;
