import { FaAlignLeft } from "react-icons/fa";
import styles from "./styles.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDashboardContext } from "../../pages/Layouts/DashboardLayout";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/appContext";

const Navbar = () => {
  // Use context to toggle sidebar
  const { toggleSidebar } = useDashboardContext();
  const { logOutUser } = useAppContext();

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
        <NavLink to="/">
          <button className={styles.logOutBtn} onClick={logOutUser}>
            Logout
          </button>
        </NavLink>
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
              <NavLink to="search-ingredients">Search By Ingredient</NavLink>
              <NavLink to="search-name">Search By Recipe</NavLink>
            </div>
          </div>

          <div className={styles.link}>
            <button className={styles.dropBtn}>Collection</button>
            <div className={styles.dropdownContent}>
              <NavLink
                to={{
                  pathname: "create",
                  state: { isEditing: false, currentRecipeInfo: [] },
                }}
              >
                Create New Recipe
              </NavLink>
              {/* <NavLink to="create">Create New Recipe</NavLink> */}
              <NavLink to="my-recipes">Personal Recipes</NavLink>
              <NavLink to="bookmarked">Bookmarked Recipes</NavLink>
            </div>
          </div>

          <div className={styles.link}>
            <button className={styles.dropBtn}>Account</button>
            <div className={styles.dropdownContent}>
              <NavLink to="profile">Settings</NavLink>
              <NavLink to="/">
                <button className={styles.logOutBtn} onClick={logOutUser}>
                  Logout
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
