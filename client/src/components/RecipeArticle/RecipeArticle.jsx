import styles from "./styles.module.scss";
import { FaRegClock, FaRegBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const RecipeArticle = ({ recipe }) => {
  const { id, title, image_url } = recipe;
  return (
    <NavLink to={`/recipes/${id}`}>
      <div className={styles.articleContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={image_url} alt={title} />
        </div>

        <div>
          <h5 className={styles.recipeTitle}>{title}</h5>
        </div>
      </div>
    </NavLink>
  );
};

export default RecipeArticle;
