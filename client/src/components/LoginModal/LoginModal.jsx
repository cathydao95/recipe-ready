import { useAppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import styles from "./styles.module.scss";

// Login Modal to display when user tries to bookmark a recipe when not logged in
const LoginModal = () => {
  // Extract functions and state from App Context
  const { showLogin, setShowLogin } = useAppContext();

  return (
    <Modal
      show={showLogin}
      onHide={() => setShowLogin(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={styles.modalHeader}></Modal.Header>
      <Modal.Body className={styles.btnContainer}>
        <h3>Want to save this recipe?</h3> Create an account and you'll be able
        to save and revisit your recipes, and more. It's free!
        <Link to="/register">
          <button className={styles.actionBtn}>Sign Up</button>
        </Link>
        <Link to="/login" className={styles.loginText}>
          Login
        </Link>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
