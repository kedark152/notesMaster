import { NavLink } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import "../styles/pages/profile.css";
export const ProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      <Navbar />

      <div className="profile-page-container flex">
        <Sidebar />
        <div className="profile-card-container flex-column-center">
          <div className="profile-card">
            <h2 className="text-center">My Profile</h2>
            <div className="avatar avatar-lg align-center">
              <img
                className="img-round"
                src="https://res.cloudinary.com/dvuh4fz9d/image/upload/v1652893486/irene-strong-v2aKnjMbP_k-unsplash_frd8hv.jpg"
                alt="avatar-sample-image-large"
              />
            </div>
            <h3 className="mg-y-xsm ">• About Me:</h3>
            <h4>{`Name: ${userData.firstName} ${userData.lastName}`}</h4>
            <h4>Email: {userData.email}</h4>
            <div className="quick-links flex-column">
              <h3 className="mg-y-xsm">• Quick Links:</h3>
              <NavLink to="/home" className="white-color fs-sm">
                Home
              </NavLink>
              <NavLink to="/archive" className="white-color fs-sm">
                Archive
              </NavLink>
              <NavLink to="/trash" className="white-color fs-sm">
                Trash
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
