/* eslint-disable react/prop-types */
import { useNotes } from "../context/notes-context";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import "../styles/component/mobileMenu.css";
import { useAuth } from "../context/auth-context";

export const MobileMenu = ({
  mobileMenuStatus,
  setMobileMenuStatus,
  logoutHandler,
}) => {
  const { notesState, dispatchNotes } = useNotes();
  const [labelValue, setLabelValue] = useState("");
  const { auth } = useAuth();
  const typeNewLabel = (e) => {
    let labelName = e.target.value;
    if (e.keyCode === 13) {
      if (labelName.length > 0) {
        setLabelValue("");
        dispatchNotes({
          type: "ADD-NEW-LABEL",
          payload: { newLabelId, labelName },
        });
        toast.success(`Added New Label - ${labelName}`);
      } else {
        toast.error("Please Type Label Name");
      }
    }
  };
  let mobileClassName = "mobile-menu";
  if (mobileMenuStatus) {
    mobileClassName = "mobile-menu show-menu";
  } else {
    mobileClassName = "mobile-menu";
  }
  let newLabelId = uuid();
  return (
    <>
      <aside className={mobileClassName}>
        <div className="mobile-menu-head">
          <Link to="/">
            <h1 className="mobile-logo">NotesMaster</h1>
          </Link>
          <span
            className="material-icons mobile-menu-close"
            onClick={() => setMobileMenuStatus((toggler) => !toggler)}
          >
            close
          </span>
        </div>
        <div className="cell-block flex-column">
          <NavLink
            className={({ isActive }) =>
              isActive ? "cell active-cell" : "cell inactive-cell"
            }
            to="/home"
          >
            <i className="material-icons">home</i>Home
          </NavLink>
          {/* Display labels in Sidebar */}
          {notesState.allLabels.map((label) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "cell active-cell" : "cell inactive-cell"
              }
              key={uuid()}
              to={`/label/${label}`}
            >
              <i className="material-icons"> label </i> {label}
            </NavLink>
          ))}
          <NavLink
            className={({ isActive }) =>
              isActive ? "cell active-cell" : "cell inactive-cell"
            }
            to="/archive"
          >
            <i className="material-icons">archive</i>Archive
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "cell active-cell" : "cell inactive-cell"
            }
            to="/trash"
          >
            <i className="material-icons">delete</i>Trash
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "cell active-cell" : "cell inactive-cell"
            }
            to="/profile"
          >
            <i className="material-icons">account_circle</i>Profile
          </NavLink>
        </div>
        {auth.token && (
          <div className="align-center add-label-input">
            <input
              type="text"
              className="sidebar-input-label fs-sm"
              placeholder="Add new label"
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
              onKeyUp={(e) => typeNewLabel(e)}
            />
            <button type="submit" className="btn-label-submit">
              <i
                className="material-icons add-label-icon"
                onClick={() => {
                  if (labelValue.length > 0) {
                    dispatchNotes({
                      type: "ADD-NEW-LABEL",
                      // eslint-disable-next-line no-undef
                      payload: { newLabelId, labelName: labelValue },
                    });
                    setLabelValue("");
                    toast.success(`Added New Label - ${labelValue}`);
                  } else {
                    toast.error(`Please Type Label Name`);
                  }
                }}
              >
                add
              </i>
            </button>
          </div>
        )}
        {auth.token ? (
          <button
            className="btn btn-solid btn-login-mobile"
            onClick={logoutHandler}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-solid btn-login-mobile">
            Login
          </Link>
        )}
      </aside>
    </>
  );
};
