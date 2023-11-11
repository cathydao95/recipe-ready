import styles from "./styles.module.scss";

// Small loader to display when scrolling or recipes loading
const SmallLoader = () => {
  return (
    <div className={styles.loader} data-testid="smallLoader">
      ...
    </div>
  );
};

export default SmallLoader;
