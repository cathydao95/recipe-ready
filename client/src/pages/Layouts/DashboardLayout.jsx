import { Outlet } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { Sidebar, Navbar, Loading } from "../../components";
import { useAppContext } from "../../context/appContext";

export const DashboardContext = createContext();

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { getCurrentUser, isLoading } = useAppContext();

  // Function to toggle sidebar to show and not show
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <DashboardContext.Provider value={{ showSidebar, toggleSidebar }}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Sidebar />
          <div>
            <Navbar />

            <div>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
