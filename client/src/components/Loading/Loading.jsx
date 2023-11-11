import styles from "./styles.module.scss";

const Loading = () => {
  // Creates a loading spinner
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading} data-testid="loadingSpinner"></div>
    </div>
  );
};

export default Loading;
