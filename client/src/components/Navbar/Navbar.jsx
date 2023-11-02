import { FaAlignLeft } from "react-icons/fa";
import styles from "./styles.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDashboardContext } from "../../pages/Layouts/DashboardLayout";
import { useAppContext } from "../../context/appContext";

const Navbar = () => {
  // Use context to toggle sidebar
  const { toggleSidebar } = useDashboardContext();
  const { logOutUser, isAuthenticated } = useAppContext();

  return (
    <nav className={styles.navbar}>
      {/* Navbar for small screens */}
      <div className={styles.smallNavItems}>
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>
        <NavLink to="/dashboard">
          <h4 className={styles.logo}>Recipe Ready</h4>
        </NavLink>
        {isAuthenticated ? (
          <NavLink to="/">
            <button className={styles.logOutBtn} onClick={logOutUser}>
              Logout
            </button>
          </NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
      {/* Navbar for large screens */}
      <div className={styles.bigNavItems}>
        <NavLink to="/dashboard">
          <h4 className={styles.logo}>Recipe Ready</h4>
        </NavLink>
        <div className={styles.linksContainer}>
          <div className={styles.link}>
            <button className={styles.dropBtn}>Explore</button>
            <div className={styles.dropdownContent}>
              <NavLink to="dashboard/search-ingredients">
                Search By Ingredient
              </NavLink>
              <NavLink to="dashboard/search-name">Search By Recipe</NavLink>
            </div>
          </div>
          {isAuthenticated ? (
            <>
              <div className={styles.link}>
                <button className={styles.dropBtn}>Collection</button>
                <div className={styles.dropdownContent}>
                  <NavLink
                    to={{
                      pathname: "dashboard/create",
                      state: { isEditing: false, currentRecipeInfo: [] },
                    }}
                  >
                    Create New Recipe
                  </NavLink>
                  <NavLink to="dashboard/my-recipes">Personal Recipes</NavLink>
                  <NavLink to="dashboard/bookmarked">
                    Bookmarked Recipes
                  </NavLink>
                </div>
              </div>
              <div className={styles.link}>
                <button className={styles.dropBtn}>Account</button>
                <div className={styles.dropdownContent}>
                  <NavLink to="dashboard/profile">Settings</NavLink>
                  <NavLink to="/login">
                    <button className={styles.logOutBtn} onClick={logOutUser}>
                      Logout
                    </button>
                  </NavLink>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.link}>
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
