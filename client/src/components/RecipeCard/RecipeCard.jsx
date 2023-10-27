import styles from "./styles.module.scss";
import { useState } from "react";
import { FaRegClock, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";
import Modal from "react-bootstrap/Modal";

const RecipeCard = ({ recipe }) => {
  const { id, title, prep_time, user_id, image_url } = recipe;
  const navigate = useNavigate();
  const { deleteRecipe } = useAppContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const { success } = await deleteRecipe(id);
    if (success) {
      navigate("/dashboard/my-recipes");
    }
  };

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
                }}
              >
                <FaRegBookmark />
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
      {/* <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete</Modal.Body>
        <Modal.Body>Edit</Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal> */}
    </>
    // <NavLink to={`/dashboard/${id}`}>
    //   <div className={styles.recipeCard}>
    //     <div className={clsx(styles.imgContainer, "imgContainer")}>
    //       <img className={styles.img} src={image_url} alt={title} />
    //       {user_id && user_id !== null && (
    //         <button
    //           className="icon trashIcon"
    //           onClick={(e) => handleDelete(e, id)}
    //         >
    //           <FaRegTrashAlt />
    //         </button>
    //       )}
    //       <button className="icon bookmarkIcon">
    //         <FaRegBookmark />
    //       </button>
    //     </div>

    //     <div className={styles.recipeInfo}>
    //       <h5 className={styles.recipeTitle}>{title}</h5>
    //       <span className="prepTime">
    //         <FaRegClock />
    //         {prep_time} min
    //       </span>
    //     </div>
    //   </div>
    // </NavLink>
  );
};

export default RecipeCard;
