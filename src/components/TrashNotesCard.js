/* eslint-disable react/prop-types */

import "../styles/component/notescard.css";
import "../styles/utils/variable.css";
import { useNotes } from "../context/notes-context";

import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { LabelChip } from "./LabelChip";

export const TrashNotesCard = ({ noteDetails }) => {
  const { _id, title, body } = noteDetails;
  const { notesState, dispatchNotes } = useNotes();

  const getIndexOfNote = (_id) => {
    const indexOfNote = notesState.notesList.findIndex(
      (note) => note._id == _id
    );
    return indexOfNote;
  };

  const displayLabels = (_id) => {
    return notesState.notesList[getIndexOfNote(_id)].labelsData;
  };
  const displayNoteColor = (_id) => {
    if (notesState.notesList.length > 0) {
      for (let i = 0; i < notesState.notesList.length; i++) {
        if (notesState.notesList[i]._id == _id) {
          return notesState.notesList[i].noteColor;
        }
      }
    } else {
      return "noteWhite";
    }
  };
  const displayPriority = (_id) => {
    let priorityName = notesState.notesList[getIndexOfNote(_id)].priority;
    switch (notesState.notesList[getIndexOfNote(_id)].priority) {
      case "none":
        return { priority: priorityName, priorityClass: "priority-none" };
      case "high":
        return { priority: priorityName, priorityClass: "priority-high" };
      case "medium":
        return { priority: priorityName, priorityClass: "priority-medium" };
      case "low":
        return { priority: priorityName, priorityClass: "priority-low" };
    }
  };
  return (
    <>
      <div
        className={`note-container pd-xsm mg-sm flex-column ${displayNoteColor(
          _id
        )}`}
        id={_id}
      >
        <div className="top-section align-center">
          <h2>{title}</h2>
        </div>
        <div className="mid-section">
          <p>{body}</p>
          <div className="label-chip-container flex mg-top-sm">
            {displayLabels(_id).map((label) => (
              <LabelChip key={uuid()} labelName={label} />
            ))}
          </div>
    
          <div
            className={`show-priority ${displayPriority(_id).priorityClass}`}
          >{`${displayPriority(_id).priority}`}</div>
        </div>
        <div className="bottom-section align-center">
          <div className="icon-buttons align-center">
            <i
              className="material-icons"
              onClick={() => {
                toast.success("Note Restored");
                dispatchNotes({ type: "TRASH-NOTE", payload: _id });
              }}
            >
              restore
            </i>
            <i
              className="material-icons"
              onClick={() => {
                toast.success("Note Deleted Permanently");
                dispatchNotes({ type: "PERMANENT-DELETE-NOTE", payload: _id });
              }}
            >
              delete_forever
            </i>
          </div>
        </div>
      </div>
    </>
  );
};
