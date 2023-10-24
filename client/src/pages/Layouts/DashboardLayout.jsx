import { Outlet } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { Sidebar, Navbar } from "../../components";

const DashboardContext = createContext();

const DashboardLayout = () => {
  const user = { name: "cathy" };
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log("logout user");
  };
  return (
    <DashboardContext.Provider
      value={{ user, showSidebar, toggleSidebar, logoutUser }}
    >
      <div>
        <Sidebar />
        <div>
          <Navbar />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
