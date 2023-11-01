import { useDashboardContext } from "../../pages/Layouts/DashboardLayout";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";

const Sidebar = () => {
  // Destrcuture functions from context
  const { showSidebar, toggleSidebar } = useDashboardContext();
  const { logOutUser } = useAppContext();
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
          <button
            type="button"
            className={styles.closeBtn}
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <h1 className={styles.title}>Recipe Ready</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.link}>
            <div className={styles.category}>Explore</div>
            <ul className={styles.linksContainer}>
              <NavLink to="search-ingredients" onClick={toggleSidebar}>
                Search By Ingredients
              </NavLink>
              <NavLink to="search-name" onClick={toggleSidebar}>
                Search By Recipe
              </NavLink>
            </ul>
          </div>

          <div className={styles.link}>
            <div className={styles.category}>Collection</div>
            <ul className={styles.linksContainer}>
              <NavLink to="create" onClick={toggleSidebar}>
                Create New Recipe
              </NavLink>
              <NavLink to="my-recipes" onClick={toggleSidebar}>
                Personal Recipes
              </NavLink>
              <NavLink to="bookmarked" onClick={toggleSidebar}>
                Bookmarked Recipes
              </NavLink>
            </ul>
          </div>

          <div className={styles.link}>
            <div className={styles.category}>Account</div>
            <ul className={styles.linksContainer}>
              <NavLink to="profile" onClick={toggleSidebar}>
                Settings
              </NavLink>
              <NavLink to="/">
                <div onClick={logOutUser}>Logout</div>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
