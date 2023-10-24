import styles from "./styles.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={clsx(styles.wrapper, "pageWrapper")}>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>Recipe Ready</h1>
        <div className={styles.btnContainer}>
          <Link to="/login" className={styles.loginBtn}>
            Login
          </Link>
          <Link to="/register" className={styles.registerBtn}>
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
