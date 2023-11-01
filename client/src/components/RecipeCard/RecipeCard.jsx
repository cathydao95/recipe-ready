import styles from "./styles.module.scss";
import { useState } from "react";
import { FaRegClock, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";
import Modal from "react-bootstrap/Modal";

const RecipeCard = ({ recipe }) => {
  const { id, title, prep_time, user_id, image_url } = recipe;
  const navigate = useNavigate();
  const { deleteRecipe, bookmarkRecipe, usersBookmarked } = useAppContext();
  console.log("users bk", usersBookmarked);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // When delete button clicked, call deleteRecipe functio and navigate to new screen
  const handleDelete = async (e, id) => {
    const { success } = await deleteRecipe(id);
    if (success) {
      navigate("/dashboard/my-recipes");
    }
  };

  const isBookmarked = usersBookmarked.some(
    (bookmarkedRecipe) => bookmarkedRecipe.id === id
  );

  console.log(isBookmarked);
  return (
    <>
      <NavLink to={`/dashboard/${id}`}>
        <div className={styles.recipeCard}>
          <div className={clsx(styles.imgContainer, "imgContainer")}>
            <img className={styles.img} src={image_url} alt={title} />
          </div>

          <div className={styles.recipeInfoContainer}>
            <div className={styles.titleContainer}>
              <h5 className={styles.recipeTitle}>{title}</h5>

              {user_id && user_id !== null && (
                <button
                  variant="primary"
                  className={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleShow();
                  }}
                >
                  <FiMoreHorizontal />
                </button>
              )}
            </div>

            <div className={styles.infoContainer}>
              <span className="prepTime">
                <FaRegClock />
                {prep_time} minutes
              </span>
              <button
                className={styles.icon}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  bookmarkRecipe(id);
                }}
              >
                <FaBookmark
                  className={clsx(
                    isBookmarked
                      ? styles.bookmarkedIcon
                      : styles.notBookmarkedIcon
                  )}
                />

                {/* {isBookmarked ? (
                  <FaBookmark className={styles.bookmarkedIcon} />
                ) : (
                  <FaRegBookmark />
                )} */}
              </button>
            </div>
          </div>
        </div>
      </NavLink>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          {/* <Modal.Title className={styles.modalTitle}></Modal.Title> */}
        </Modal.Header>
        <Modal.Body className={styles.btnContainer}>
          <button
            className={styles.actionBtn}
            variant="secondary"
            onClick={() =>
              navigate("/dashboard/create", {
                state: { isEditing: true, currentRecipeInfo: recipe },
              })
            }
          >
            Edit Recipe
          </button>
          <button
            className={styles.actionBtn}
            variant="primary"
            onClick={() => deleteRecipe(id)}
          >
            Delete Recipe
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RecipeCard;
