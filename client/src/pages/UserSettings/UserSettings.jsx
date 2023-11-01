import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../../context/appContext";

const UserSettings = () => {
  // const { currentUser } = useAppContext();
  // const [updatedUserInfo, setUpdatedUserInfo] = useState({
  //   firstName: currentUser[0]?.first_name,
  //   lastName: currentUser[0]?.last_name,
  //   email: currentUser[0]?.email,
  //   password: "",
  // });
  // const handleInput = (e) => {
  //   setUpdatedUserInfo((prevInput) => {
  //     return { ...prevInput, [e.target.name]: e.target.value };
  //   });
  // };
  // const getCurrentUser = async () => {
  //   try {
  //     let response = await fetch("http://localhost:8080/api/v1/users/current", {
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       const {
  //         data: { user },
  //       } = await response.json();
  //       setCurrentUser(user);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // return (
  //   <div className="pageWrapper">
  //     <h1 className="title">User Profile</h1>
  //     <form className="form">
  //       <FormRow
  //         type="text"
  //         name="firstName"
  //         labelText="first name"
  //         handleInput={handleInput}
  //         value={updatedUserInfo.firstName}
  //       />
  //       <FormRow
  //         type="text"
  //         name="lastName"
  //         labelText="last name"
  //         handleInput={handleInput}
  //         value={updatedUserInfo.lastName}
  //       />
  //       <FormRow
  //         type="email"
  //         name="email"
  //         handleInput={handleInput}
  //         value={updatedUserInfo.email}
  //       />
  //       <FormRow type="password" name="password" handleInput={handleInput} />
  //       <div className="formLinkContainer">
  //         <p className="formText">Already a member? </p>
  //         <Link to="/login" className="formLink">
  //           Login
  //         </Link>
  //       </div>
  //       <button className="formBtn" type="submit">
  //         Submit
  //       </button>
  //       <p className="formAlert">Error Message</p>
  //     </form>
  //   </div>
  // );
};

export default UserSettings;
