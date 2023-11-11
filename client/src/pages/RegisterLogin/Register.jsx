import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../../context/appContext";
import axios from "../../utils/axiosConfig";

const Register = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, getCurrentUser } = useAppContext();
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Function to handle registration form input
  const handleInput = (e) => {
    setRegistrationInfo((prevInput) => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };

  // Function to register new user
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `/api/v1/auth/register`,
        registrationInfo
      );

      // If success, register user and navigate user to dashboard
      const {
        data: { msg },
      } = response;
      if (msg) getCurrentUser();
      toast.success(msg);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const {
        data: { msg },
      } = error.response;
      if (msg) {
        toast.error(msg);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Registration error:", error.message);
      }
    }
  };

  return (
    <div className="pageWrapper">
      <h1 className="title">Recipe Ready</h1>
      <div className="formContainer">
        <form className="form">
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            handleInput={handleInput}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            handleInput={handleInput}
          />
          <FormRow
            type="email"
            name="email"
            handleInput={handleInput}
            labelText="Email"
          />
          <FormRow
            type="password"
            name="password"
            handleInput={handleInput}
            labelText="Password"
          />
          <div className="formLinkContainer">
            <p className="formText">Already a member? </p>
            <Link to="/login" className="formLink">
              Login
            </Link>
          </div>

          <button className="formBtn" type="submit" onClick={registerUser}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
