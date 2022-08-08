/* eslint-disable react/prop-types */
import "../styles/layouts/navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFilter } from "../context/filter-context";
import { MobileMenu } from "./MobileMenu";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { toast } from "react-toastify";
import { useNotes } from "../context/notes-context";
export const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { dispatchFilter } = useFilter();
  const location = useLocation();
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const { auth, setAuth } = useAuth();
  const { dispatchNotes } = useNotes();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setAuth({ ...auth, token: "", isLoggedIn: false });
    dispatchNotes({ type: "CLEAR-NOTES-STATE" });
    toast.success("Logout Success");
    navigate("/");
  };
  return (
    <>
      <nav id="nav-bar">
        <div className="nav-brand fs-md align-center">
          <i
            className="material-icons mobile-menu-icon"
            onClick={() => setMobileMenuStatus((toggler) => !toggler)}
          >
            menu
          </i>
          <Link to="/">NotesMaster</Link>
        </div>
        {location.pathname == "/home" && (
          <div className="search-field">
            <i className="material-icons" id="search-icon">
              search
            </i>
            <i
              className="material-icons"
              id="filter-icon"
              onClick={() => dispatchFilter({ type: "SHOW-FILTER-BOX" })}
            >
              tune
            </i>
            <input
              type="text"
              name="search-bar"
              id="search-bar"
              placeholder="Search your notes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        <ul className="nav-pills fs-sm fw-bold">
          <li>
            {auth.token ? (
              <a className="btn btn-solid btn-login" onClick={logoutHandler}>
                Logout
                <i className="material-icons mg-left-xsm">logout</i>
              </a>
            ) : (
              <Link to="/login" className="btn btn-solid btn-login">
                Login
                <i className="material-icons mg-left-xsm">login</i>
              </Link>
            )}
          </li>
        </ul>
        <MobileMenu
          mobileMenuStatus={mobileMenuStatus}
          setMobileMenuStatus={setMobileMenuStatus}
          logoutHandler={logoutHandler}
        />
      </nav>
    </>
  );
};
