import { useState } from "react";
import { Link } from "react-router-dom";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import axios from "../../utils/axiosConfig";

const Login = () => {
  const navigate = useNavigate();
  const { getCurrentUser } = useAppContext();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // Function to handle login input
  const handleInput = (e) => {
    setLoginInfo((prevInput) => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };

  // Function to login user
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`/api/v1/auth/login`, loginInfo);
      // If success, log in user and navigate user to dashboard and display toast success
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
        console.error(error);
        toast.error("An error occurred during login");
      }
    }
  };

  return (
    <div className="pageWrapper">
      <h1 className="title">Recipe Ready</h1>
      <div className="formContainer">
        <form className="form">
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
            <p className="formText">Not a member?</p>
            <Link to="/register" className="formLink">
              Register
            </Link>
          </div>
          <button className="formBtn" type="submit" onClick={loginUser}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
