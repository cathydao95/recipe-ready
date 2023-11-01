import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormRow, Loading } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../../context/appContext";

const UserSettings = () => {
  const { getCurrentUser, currentUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  console.log("current", currentUser);
  // Function to handle edit user form
  const handleInput = (e) => {
    setUpdatedUserInfo((prevInput) => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };

  // Function to edit user information
  const editUserInformation = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:8080/api/v1/users/current", {
        method: "PUT",
        headers: {
          "Content-type": "application/JSON",
        },
        credentials: "include",
        body: JSON.stringify(updatedUserInfo),
      });

      // If success, register user and navigate user to dashboard
      if (response.ok) {
        let { msg } = await response.json();

        toast.success(msg);
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

  console.log(currentUser);
  useEffect(() => {
    setUpdatedUserInfo({
      firstName: currentUser[0]?.first_name,
      lastName: currentUser[0]?.last_name,
      email: currentUser[0]?.email,
      password: "",
    });
    setIsLoading(false);
  }, [currentUser]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="pageWrapper">
      <h1 className="title">User Profile</h1>
      <form className="form">
        <FormRow
          type="text"
          name="firstName"
          labelText="first name"
          handleInput={handleInput}
          value={updatedUserInfo.firstName}
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          handleInput={handleInput}
          value={updatedUserInfo.lastName}
        />
        <FormRow
          type="email"
          name="email"
          handleInput={handleInput}
          value={updatedUserInfo.email}
        />
        <FormRow type="password" name="password" handleInput={handleInput} />

        <button
          className="formBtn"
          type="submit"
          onClick={(e) => editUserInformation(e)}
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
