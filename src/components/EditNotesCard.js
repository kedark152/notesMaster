/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "../styles/component/editnotes.css";
import "../styles/utils/variable.css";
import { useNotes } from "../context/notes-context";
import { v4 as uuid } from "uuid";
import { getCurrentDate } from "../utilities/getCurrentDate";
import { createNewNote, updateNote } from "../services/notesServices";
import { useAuth } from "../context/auth-context";

export const EditNotesCard = () => {
  const editNotesForm = useRef(null);
  const { notesState, dispatchNotes } = useNotes();
  const { auth } = useAuth();

  const [errorText, setErrorText] = useState("");

  const handleSaveNewNote = () => {
    const form = editNotesForm.current;
    const currentDate = getCurrentDate();
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
        labelsData: [],
        noteColor: "noteWhite",
        noteCreatedDate: currentDate,
        priority: notesState.priority,
      };
    } else {
      setErrorText("Title & Body Field should not be Blank");
      return { editBoxStatus: "show-edit-box" };
    }
  };
  const handleUpdateNote = () => {
    const form = editNotesForm.current;

    if (
      form["editTitle"].value.length > 0 &&
      form["editBody"].value.length > 0
    ) {
      setErrorText("");

      return {
        _id: notesState._id,
        title: form["editTitle"].value,
        body: form["editBody"].value,
        editBoxStatus: "hide-edit-box",
        isPinned: notesState.isPinned,
        priority: notesState.priority,
      };
    } else {
      setErrorText("Title & Body Field should not be Blank");
      return { editBoxStatus: "show-edit-box" };
    }
  };

  const handleSaveButton = (e) => {
    e.preventDefault();
    notesState.isEditing
      ? updateNote({
          auth,
          noteData: handleUpdateNote(),
          dispatchNotes,
        })
      : createNewNote({
          auth,
          noteData: handleSaveNewNote(),
          dispatchNotes,
        });
  };

  return (
    <>
      <div className={`edit-note-background ${notesState.setEditBox}`}>
        <form
          ref={editNotesForm}
          onSubmit={(e) => handleSaveButton(e)}
          className={`edit-note-container pd-xsm mg-sm flex-column  ${notesState.noteColor}`}
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
              required
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
              required
            />
            <label htmlFor="priority">Priority: </label>
            <select
              id="priority"
              name="note-priority"
              onChange={(e) =>
                dispatchNotes({
                  type: "CHANGE-PRIORITY",
                  payload: e.target.value,
                })
              }
            >
              <option value="none">None</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="bottom-section align-center">
            <div className="action-buttons align-center">
              <button className="btn btn-solid" type="submit">
                Save
              </button>
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
