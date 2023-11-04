import { pageContent } from "../../utils/pageContent";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

// EmptyPageContent renders when there are no recipes to show
const EmptyPageContent = ({ page }) => {
  const content = pageContent[page];
  // Content to display depending on the page passed
  return (
    <div className={styles.container}>
      <div className={styles.noRecipesContainer}>
        <p className={styles.text}>{content.text}</p>
        <Link to="/create">
          <button className={styles.btn}>{content.buttonText}</button>
        </Link>
      </div>

      <div className={styles.imgContainer}>
        <img className={styles.img} src={content.imageSrc} alt="Cooking" />
      </div>
    </div>
  );
};

export default EmptyPageContent;
