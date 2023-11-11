import { useDashboardContext } from "../../pages/Layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";
import logo from "../../assets/logo.png";
import { SidebarLinks } from "../../components/index";

// Sidebar to display on small screen sizes
const Sidebar = () => {
  // Destrcuture functions from context
  const { showSidebar, toggleSidebar } = useDashboardContext();
  const { logOutUser, isAuthenticated } = useAppContext();
  return (
    <div
      className={clsx(
        styles.sidebarContainer,
        showSidebar && styles.showSidebar
      )}
    >
      <div>
        <div className={styles.headerContent}>
          {/* Close button to hide sidebar */}
          <Link to="/" onClick={toggleSidebar}>
            <img className={styles.logo} src={logo} alt="Recipe Ready Logo" />
          </Link>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={toggleSidebar}
            aria-label="close"
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.container}>
          {/* DEFAULT LINKS */}
          <SidebarLinks
            category="Explore"
            links={[
              {
                to: "search-ingredients",
                text: "Search By Ingredients",
                onClick: toggleSidebar,
              },
              { to: "/", text: "Search By Recipe", onClick: toggleSidebar },
            ]}
          />
          {/* Check if user is authenticated to determine what links to display */}
          {isAuthenticated ? (
            // AUTHENTICATED USER
            <>
              <SidebarLinks
                category="Collection"
                links={[
                  {
                    to: "create",
                    text: "Create New Recipe",
                    onClick: toggleSidebar,
                  },
                  {
                    to: "my-recipes",
                    text: "Personal Recipes",
                    onClick: toggleSidebar,
                  },
                  {
                    to: "bookmarked",
                    text: "Bookmarked Recipes",
                    onClick: toggleSidebar,
                  },
                ]}
              />
              <SidebarLinks
                category="Account"
                links={[
                  { to: "profile", text: "Settings", onClick: toggleSidebar },
                  {
                    to: "login",
                    text: "Logout",
                    onClick: () => {
                      logOutUser();
                      toggleSidebar();
                    },
                  },
                ]}
              />
            </>
          ) : (
            <>
              <SidebarLinks
                category="Account"
                links={[
                  { to: "register", text: "Register", onClick: toggleSidebar },
                  { to: "login", text: "Login", onClick: toggleSidebar },
                ]}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
