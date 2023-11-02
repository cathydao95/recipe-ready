import { useDashboardContext } from "../../pages/Layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";

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
          <button
            type="button"
            className={styles.closeBtn}
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <Link to="/" onClick={toggleSidebar}>
            <h1 className={styles.title}>Recipe Ready</h1>
          </Link>
        </div>
        <div className={styles.container}>
          <div className={styles.link}>
            <div className={styles.category}>Explore</div>
            <ul className={styles.linksContainer}>
              <Link to="search-ingredients" onClick={toggleSidebar}>
                Search By Ingredients
              </Link>
              <Link to="/" onClick={toggleSidebar}>
                Search By Recipe
              </Link>
            </ul>
          </div>
          {isAuthenticated ? (
            <>
              <div className={styles.link}>
                <div className={styles.category}>Collection</div>
                <ul className={styles.linksContainer}>
                  <Link to="create" onClick={toggleSidebar}>
                    Create New Recipe
                  </Link>
                  <Link to="my-recipes" onClick={toggleSidebar}>
                    Personal Recipes
                  </Link>
                  <Link to="bookmarked" onClick={toggleSidebar}>
                    Bookmarked Recipes
                  </Link>
                </ul>
              </div>

              <div className={styles.link}>
                <div className={styles.category}>Account</div>
                <ul className={styles.linksContainer}>
                  <Link to="profile" onClick={toggleSidebar}>
                    Settings
                  </Link>
                  <Link to="login">
                    <div
                      onClick={() => {
                        logOutUser();
                        toggleSidebar();
                      }}
                    >
                      Logout
                    </div>
                  </Link>
                </ul>
              </div>
            </>
          ) : (
            <div className={styles.link}>
              <Link to="/login" onClick={toggleSidebar}>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
