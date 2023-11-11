import styles from "./styles.module.scss";

// Creates a loading spinner
const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading} data-testid="loadingSpinner"></div>
    </div>
  );
};

export default Loading;
