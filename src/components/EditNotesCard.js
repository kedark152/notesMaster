/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "../styles/component/editnotes.css";
import "../styles/utils/variable.css";
import { useNotes } from "../context/notes-context";
import { v4 as uuid } from "uuid";

export const EditNotesCard = () => {
  const editNotesForm = useRef(null);
  const { notesState, dispatchNotes } = useNotes();
  console.log(notesState.setEditBox);
  console.log(notesState);

  const [errorText, setErrorText] = useState("");

  const handleSaveForm = () => {
    const form = editNotesForm.current;
    if (
      form["editTitle"].value.length > 0 &&
      form["editBody"].value.length > 0
    ) {
      setErrorText("");
      return {
        _id: uuid(),
        title: form["editTitle"].value,
        body: form["editBody"].value,
        editBoxStatus: "hide-edit-box",
        isPinned: notesState.isPinned,
      };
    } else {
      setErrorText("Title & Body Field should not be Blank");
      return { editBoxStatus: "show-edit-box" };
    }
  };
  return (
    <>
      <div className={`edit-note-background ${notesState.setEditBox}`}>
        <form
          ref={editNotesForm}
          className="edit-note-container pd-xsm mg-sm flex-column"
        >
          <div className="top-section align-center">
            <textarea
              name="editTitle"
              className="edit-title"
              placeholder="Title"
              rows="1"
              cols="40"
              value={notesState.title}
              onChange={(e) =>
                dispatchNotes({ type: "EDIT-TITLE", payload: e.target.value })
              }
            />
            <i
              className={
                notesState.isPinned
                  ? `material-icons primary-color`
                  : `material-icons grey`
              }
              onClick={() =>
                dispatchNotes({
                  type: "EDITOR-PIN",
                  payload: !notesState.isPinned,
                })
              }
            >
              push_pin
            </i>
          </div>
          <div className="mid-section">
            <textarea
              name="editBody"
              className="edit-body"
              placeholder="Take a note..."
              rows="4"
              cols="50"
              value={notesState.body}
              onChange={(e) =>
                dispatchNotes({ type: "EDIT-BODY", payload: e.target.value })
              }
            />
          </div>
          <div className="bottom-section align-center">
            <div className="action-buttons align-center">
              <a
                className="btn btn-solid"
                onClick={() =>
                  dispatchNotes({
                    type: "SAVE-NOTE",
                    payload: handleSaveForm(),
                  })
                }
              >
                Save
              </a>
              <a
                className="btn btn-outline"
                onClick={() => dispatchNotes({ type: "CANCEL-NOTE" })}
              >
                Cancel
              </a>
            </div>
          </div>
          <div className="error-text fw-bold fs-sm">{errorText}</div>
        </form>
      </div>
    </>
  );
};
