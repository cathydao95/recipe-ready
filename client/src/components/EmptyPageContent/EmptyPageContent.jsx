import { pageContent } from "../../utils/pageContent";
import styles from "./styles.module.scss";
import { useNavigate, Link } from "react-router-dom";

// EmptyPageContent renders when there are no recipes to show
const EmptyPageContent = ({ page }) => {
  const navigate = useNavigate();
  const content = pageContent[page];
  // Content to display depending on the page passed
  return (
    <div className={styles.container}>
      <div className={styles.noRecipesContainer}>
        <p className={styles.text}>{content.text}</p>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={content.imageSrc}
            alt={content.altText}
          />
        </div>
        {page === "noRecipe" ? (
          <button onClick={() => navigate(-1)} className={styles.btn}>
            Back to Search
          </button>
        ) : (
          <Link to={content.buttonLink}>
            <button className={styles.btn}>{content.buttonText}</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyPageContent;
