import { FaAlignLeft } from "react-icons/fa";
import styles from "./styles.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDashboardContext } from "../../pages/Layouts/DashboardLayout";
import { toast } from "react-toastify";

const Navbar = () => {
  // Use context to toggle sidebar
  const { toggleSidebar } = useDashboardContext();
  const navigate = useNavigate();

  // Function to logout User
  const logOutUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
        credentials: "include",
      });

      // If logout is successful, navigate to landing page and display toast message
      if (response.ok) {
        const { msg } = await response.json();
        navigate("/");
        toast.success(msg);
      }
    } catch (error) {
      console.error(error);
    }
  };
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
        <div className={styles.btnContainer}>Logout</div>
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
                  pathname: "/create",
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
              <button onClick={logOutUser}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
