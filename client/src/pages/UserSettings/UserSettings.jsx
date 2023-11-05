import { useState, useEffect } from "react";
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
      let response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/current`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/JSON",
          },
          credentials: "include",
          body: JSON.stringify(updatedUserInfo),
        }
      );

      // If success, register user and navigate user to dashboard
      if (response.ok) {
        const {
          data: { msg },
        } = await response.json();

        toast.success(msg);
      } else {
        let { msg } = await response.json();
        if (msg) {
          toast.error(msg);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
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
