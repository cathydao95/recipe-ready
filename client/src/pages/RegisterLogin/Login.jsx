import { useState } from "react";
import { Link } from "react-router-dom";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setLoginInfo((prevInput) => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };

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

      if (response.ok) {
        let { msg } = await response.json();
        console.log(msg);
        toast.success(msg);
        navigate("/recipes");
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
      <form className="form">
        <FormRow type="email" name="email" handleInput={handleInput} />
        <FormRow type="password" name="password" handleInput={handleInput} />
        <div className="formLinkContainer">
          <p className="formText">Not a member?</p>
          <Link to="/register" className="formLink">
            Register
          </Link>
        </div>
        <button className="formBtn" type="submit" onClick={loginUser}>
          Submit
        </button>
        <p className="formAlert">Error Message</p>
      </form>
    </div>
  );
};

export default Login;
