import { useNotes } from "../context/notes-context";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import "../styles/layouts/sidebar.css";

export const Sidebar = () => {
  const { notesState, dispatchNotes } = useNotes();
  const [labelValue, setLabelValue] = useState("");
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
  let newLabelId = uuid();
  return (
    <>
      <aside className="sidebar">
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
              // className="cell labels-cell"
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
        <div className="align-center add-label-input">
          <input
            type="text"
            className="sidebar-input-label fs-sm"
            placeholder="Enter new label"
            required=""
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
        <a
          className="btn btn-solid btn-new-note primary-bg-color"
          onClick={() => dispatchNotes({ type: "CREATE-NEW-NOTE" })}
        >
          Create New Note
        </a>
      </aside>
    </>
  );
};
