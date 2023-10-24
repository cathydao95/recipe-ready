import { Link, useRouteError } from "react-router-dom";
import img from "../../assets/not-found.svg";
import styles from "./styles.module.scss";
import clsx from "clsx";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div className={clsx(styles.wrapper, "pageWrapper")}>
        <div className={styles.infoContainer}>
          <img className={styles.image} src={img} alt="not found" />
          <div className={styles.textContainer}>
            <h3 className={styles.header}>Oops! Page Not Found</h3>
            <p className={styles.text}>
              We cannot find the page you are looking for
            </p>
            <Link to="/dashboard" className={styles.homeBtn}>
              Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Something Went Wrong</h3>
      </div>
    );
  }
};

export default Error;
