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
        <Link to="/">
          <h4 className={styles.logo}>Recipe Ready</h4>
        </Link>
        {isAuthenticated ? (
          <Link to="/">
            <button className={styles.logoutBtn} onClick={logOutUser}>
              Logout
            </button>
          </Link>
        ) : (
          <Link to="/login" className={styles.loginBtn}>
            Login
          </Link>
        )}
      </div>
      {/* Navbar for large screens */}
      <div className={styles.bigNavItems}>
        <Link to="/">
          <h4 className={styles.logo}>Recipe Ready</h4>
        </Link>
        <div className={styles.linksContainer}>
          <div className={styles.link}>
            <button className={styles.dropBtn}>Explore</button>
            <div className={styles.dropdownContent}>
              <Link to="search-ingredients">Search By Ingredient</Link>
              <Link to="/">Search By Recipe</Link>
            </div>
          </div>
          {isAuthenticated ? (
            <>
              <div className={styles.link}>
                <button className={styles.dropBtn}>Collection</button>
                <div className={styles.dropdownContent}>
                  <Link
                    to={{
                      pathname: "create",
                      state: { isEditing: false, currentRecipeInfo: [] },
                    }}
                  >
                    Create New Recipe
                  </Link>
                  <Link to="my-recipes">Personal Recipes</Link>
                  <Link to="bookmarked">Bookmarked Recipes</Link>
                </div>
              </div>
              <div className={styles.link}>
                <button className={styles.dropBtn}>Account</button>
                <div className={styles.dropdownContent}>
                  <Link to="profile">Settings</Link>
                  <Link to="login">
                    <button className={styles.logoutBtn} onClick={logOutUser}>
                      Logout
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.link}>
              <Link to="/login" className={styles.loginBtn}>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
