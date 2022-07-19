/* eslint-disable react/prop-types */

import "../styles/component/notescard.css";
import "../styles/utils/variable.css";
import { useNotes } from "../context/notes-context";
import { useAuth } from "../context/auth-context";

import { v4 as uuid } from "uuid";
import { LabelChip } from "./LabelChip";
import { restoreFromTrash, deleteFromTrash } from "../services/trashServices";

export const TrashNotesCard = ({ noteDetails, list }) => {
  const { _id, title, body } = noteDetails;
  const { dispatchNotes } = useNotes();
  const { auth } = useAuth();

  const getIndexOfNote = (_id) => {
    const indexOfNote = list.findIndex((note) => note._id == _id);
    return indexOfNote;
  };

  const displayLabels = (_id) => {
    return list[getIndexOfNote(_id)].labelsData;
  };
  const displayNoteColor = (_id) => {
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i]._id == _id) {
          return list[i].noteColor;
        }
      }
    } else {
      return "noteWhite";
    }
  };
  const displayPriority = (_id) => {
    let priorityName = list[getIndexOfNote(_id)].priority;
    switch (list[getIndexOfNote(_id)].priority) {
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
                restoreFromTrash({
                  token: auth.token,
                  noteId: _id,
                  dispatchNotes,
                });
              }}
            >
              restore
            </i>
            <i
              className="material-icons"
              onClick={() => {
                deleteFromTrash({
                  token: auth.token,
                  noteId: _id,
                  dispatchNotes,
                });
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
