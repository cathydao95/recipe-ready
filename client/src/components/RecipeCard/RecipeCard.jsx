import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";
import Modal from "react-bootstrap/Modal";
import LoginModal from "../LoginModal/LoginModal";

const RecipeCard = ({ recipe, page }) => {
  // Destructure properties from recipe prop
  const { id, title, prep_time, user_id, image_url } = recipe;

  // User navigate hook from react router
  const navigate = useNavigate();

  // Extract functions and state from App Context
  const {
    deleteRecipe,
    usersBookmarked,
    handleBookmarkClick,
    setShowLogin,
    isAuthenticated,
  } = useAppContext();

  // State to control whether to show modal
  const [show, setShow] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);

  // Function to close modal
  const handleClose = () => setShow(false);
  // Function to show modal
  const handleShow = () => setShow(true);

  // Check if current recipe is included in the current user's bookmarked recipes
  const isBookmarked = usersBookmarked.some(
    (bookmarkedRecipe) => bookmarkedRecipe.id === id
  );

  useEffect(() => {
    setShowLogin(false);
  }, []);

  return (
    <>
      <Link to={`/recipes/${id}`}>
        <div className={styles.recipeCard}>
          <div className={clsx(styles.imgContainer, "imgContainer")}>
            <img className={styles.img} src={image_url} alt={title} />
          </div>

          <div className={styles.recipeInfoContainer}>
            <div className={styles.titleContainer}>
              <h5 className={styles.recipeTitle}>{title}</h5>

              {user_id && user_id !== null && (
                <div
                  variant="primary"
                  className={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleShow();
                  }}
                >
                  <FiMoreHorizontal />
                </div>
              )}
            </div>

            <div className={styles.infoContainer}>
              <span className={styles.prepTime}>
                <FaRegClock />
                {prep_time} minutes
              </span>
              <div
                className={styles.icon}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleBookmarkClick(id);
                }}
              >
                {isBookmarked ? (
                  <BsBookmarkFill className="bookmarkFilled" />
                ) : (
                  <BsBookmark />
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {!isAuthenticated && <LoginModal />}

      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={styles.modalHeader}></Modal.Header>
        <Modal.Body className={styles.btnContainer}>
          <button
            className={styles.actionBtn}
            variant="secondary"
            onClick={() => {
              navigate("/create", {
                state: { isEditing: true, currentRecipeInfo: recipe },
              });
              handleClose();
            }}
          >
            Edit Recipe
          </button>
          <button
            className={styles.actionBtn}
            variant="primary"
            onClick={() => {
              deleteRecipe(id);
              handleClose();
            }}
          >
            Delete Recipe
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RecipeCard;
