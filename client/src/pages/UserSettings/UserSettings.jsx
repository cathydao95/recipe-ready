import { useState, useEffect } from "react";
import { FormRow, Loading } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../../context/appContext";
import axios from "../../utils/axiosConfig";

// page to update user's login information
const UserSettings = () => {
  const { getCurrentUser, currentUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

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
      let response = await axios.put(`/api/v1/users/current`, updatedUserInfo);
      const {
        data: { msg },
      } = response.data;
      toast.success(msg);
    } catch (error) {
      const {
        data: { msg },
      } = error.response;
      if (msg) {
        toast.error(msg);
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  // If currentUser exists and has a length greater than 0, set updatedUserInfo state to the first_name, last_name, and email of current user
  useEffect(() => {
    if (currentUser && currentUser.length > 0) {
      setUpdatedUserInfo({
        firstName: currentUser[0]?.first_name || "",
        lastName: currentUser[0]?.last_name || "",
        email: currentUser[0]?.email || "",
      });
      setIsLoading(false);
    }
  }, [currentUser]);

  // Fetch current user information
  useEffect(() => {
    getCurrentUser();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="pageWrapper">
      <h1 className="title">User Profile</h1>
      <div className="formContainer">
        <form className="form">
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            handleInput={handleInput}
            value={updatedUserInfo.firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            handleInput={handleInput}
            value={updatedUserInfo.lastName}
          />
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            handleInput={handleInput}
            value={updatedUserInfo.email}
          />

          <button
            className="formBtn"
            type="submit"
            onClick={(e) => editUserInformation(e)}
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
