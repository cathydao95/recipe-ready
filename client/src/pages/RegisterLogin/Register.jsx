import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setRegistrationInfo((prevInput) => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/JSON",
        },
        credentials: "include",
        body: JSON.stringify(registrationInfo),
      });

      if (response.ok) {
        let { msg } = await response.json();
        // console.log(msg);
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

  // console.log(registrationInfo);
  return (
    <div className="pageWrapper">
      <h1 className="title">Recipe Ready</h1>
      <form className="form">
        <FormRow
          type="text"
          name="firstName"
          labelText="first name"
          handleInput={handleInput}
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          handleInput={handleInput}
        />
        <FormRow type="email" name="email" handleInput={handleInput} />
        <FormRow type="password" name="password" handleInput={handleInput} />
        <div className="formLinkContainer">
          <p className="formText">Already a member? </p>
          <Link to="/login" className="formLink">
            Login
          </Link>
        </div>

        <button className="formBtn" type="submit" onClick={registerUser}>
          Submit
        </button>
        <p className="formAlert">Error Message</p>
      </form>
    </div>
  );
};

export default Register;
