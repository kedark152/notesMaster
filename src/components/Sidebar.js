import { useNotes } from "../context/notes-context";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import "../styles/layouts/sidebar.css";

export const Sidebar = () => {
  const { dispatchNotes } = useNotes();
  const [labelValue, setLabelValue] = useState("");
  const typeNewLabel = (e) => {
    let labelName = e.target.value;
    if (e.keyCode === 13) {
      setLabelValue("");
      dispatchNotes({
        type: "ADD-NEW-LABEL",
        payload: { newLabelId, labelName },
      });
      toast.success(`Added New Label - ${labelName}`);
    }
  };
  let newLabelId = uuid();
  return (
    <>
      <aside className="sidebar">
        <div className="cell-block flex-column">
          <Link tabIndex="1" id="cell" to="/home">
            <i className="material-icons">home</i>Home
          </Link>
          <Link tabIndex="2" id="cell" to="/labels">
            <i className="material-icons">label</i>Label
          </Link>
          <a tabIndex="3" id="cell">
            <i className="material-icons">archive</i>Archive
          </a>
          <a tabIndex="4" id="cell">
            <i className="material-icons">delete</i>Trash
          </a>
          <a tabIndex="5" id="cell">
            <i className="material-icons">account_circle</i>Profile
          </a>
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
                dispatchNotes({
                  type: "ADD-NEW-LABEL",
                  // eslint-disable-next-line no-undef
                  payload: { newLabelId, labelName: labelValue },
                });
                setLabelValue("");
                toast.success(`Added New Label - ${labelValue}`);
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
