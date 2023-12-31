import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

// Create recipe articles for each recipe in dashboard
const RecipeArticle = ({ recipe }) => {
  const { id, title, image_url } = recipe;
  return (
    <Link to={`recipes/${id}`}>
      <div className={styles.articleContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={image_url} alt={title} />
        </div>

        <div>
          <h5 className={styles.recipeTitle}>{title}</h5>
        </div>
      </div>
    </Link>
  );
};

export default RecipeArticle;
