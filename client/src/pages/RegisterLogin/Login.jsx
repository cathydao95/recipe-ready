import { useState } from "react";
import { Link } from "react-router-dom";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppContext();
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
      let response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/JSON",
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });
      // If success, log in user and navigate user to dashboard and display toast success
      if (response.ok) {
        let { msg } = await response.json();
        setIsAuthenticated(true);
        toast.success(msg);
        navigate("/");
      } else {
        let { msg } = await response.json();
        if (msg) {
          toast.error(msg);
        }
      }
    } catch (error) {
      console.error(error);
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
