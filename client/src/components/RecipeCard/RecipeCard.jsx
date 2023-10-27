import styles from "./styles.module.scss";
import { FaRegClock, FaRegBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const RecipeCard = ({ recipe }) => {
  const { id, title, prep_time, user_id, image_url } = recipe;
  return (
    <NavLink to={`/dashboard/${id}`}>
      <div className={styles.recipeCard}>
        <div className={clsx(styles.imgContainer, "imgContainer")}>
          <img className={styles.img} src={image_url} alt={title} />
          <div className="bookmarkIcon">
            <FaRegBookmark />
          </div>
        </div>

        <div className={styles.recipeInfo}>
          <h5 className={styles.recipeTitle}>{title}</h5>
          <span className="prepTime">
            <FaRegClock />
            {prep_time} min
          </span>
        </div>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
