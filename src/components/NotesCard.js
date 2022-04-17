/* eslint-disable react/prop-types */

import "../styles/component/notescard.css";
import "../styles/utils/variable.css";
import { useState } from "react";
import { useNotes } from "../context/notes-context";
import { LabelBox } from "./LabelBox";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { LabelChip } from "./LabelChip";
import { ColorBox } from "./ColorBox";

export const NotesCard = ({ noteDetails }) => {
  const { _id, title, body, isPinned, isArchived, isTrashed } = noteDetails;
  const { notesState, dispatchNotes } = useNotes();

  const [labelBox, setLabelBox] = useState(false);
  const [colorBox, setColorBox] = useState(false);

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
          <i
            className={
              isPinned ? `material-icons primary-color` : `material-icons grey`
            }
            onClick={() => {
              if (!isPinned && isArchived) {
                dispatchNotes({ type: "ARCHIVE-NOTE", payload: _id });
                dispatchNotes({
                  type: "NOTE-PIN",
                  payload: {
                    _id,
                    title,
                    body,
                    isPinned,
                    isArchived,
                    isTrashed,
                  },
                });
                toast.success("Note Pinned & Un-Archived");
              } else {
                dispatchNotes({
                  type: "NOTE-PIN",
                  payload: {
                    _id,
                    title,
                    body,
                    isPinned,
                    isArchived,
                    isTrashed,
                  },
                });
              }
            }}
          >
            push_pin
          </i>
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
          <p className="creation-date">{`Created on ${
            notesState.notesList[getIndexOfNote(_id)].noteCreatedDate
          }`}</p>
          <div className="icon-buttons align-center">
            <i
              className="material-icons"
              onClick={() =>
                dispatchNotes({
                  type: "EDIT-NOTE",
                  payload: {
                    _id,
                    title,
                    body,
                    isEditing: true,
                    isPinned: isPinned,
                  },
                })
              }
            >
              edit
            </i>
            <i
              className="material-icons"
              onClick={() => setColorBox((colorBox) => !colorBox)}
            >
              palette
            </i>
            <i
              className="material-icons"
              onClick={() => setLabelBox((labelBox) => !labelBox)}
            >
              label
            </i>
            <i
              className="material-icons"
              onClick={() => {
                if (isPinned && !isArchived) {
                  dispatchNotes({ type: "ARCHIVE-NOTE", payload: _id });
                  dispatchNotes({
                    type: "NOTE-PIN",
                    payload: {
                      _id,
                      title,
                      body,
                      isPinned,
                      isArchived,
                      isTrashed,
                    },
                  });

                  toast.success("Note unpinned & Archived");
                } else {
                  toast.success(
                    notesState.notesList[getIndexOfNote(_id)].isArchived
                      ? `Note Unarchived: Moved to Home`
                      : `Moved to Archive`
                  );
                  dispatchNotes({ type: "ARCHIVE-NOTE", payload: _id });
                }
              }}
            >
              {notesState.notesList[getIndexOfNote(_id)].isArchived
                ? `unarchive`
                : `archive`}
            </i>
            <i
              className="material-icons"
              onClick={() => {
                if (isPinned && !isTrashed) {
                  dispatchNotes({ type: "TRASH-NOTE", payload: _id });
                  dispatchNotes({
                    type: "NOTE-PIN",
                    payload: {
                      _id,
                      title,
                      body,
                      isPinned,
                      isArchived,
                      isTrashed,
                    },
                  });

                  toast.success("Note unpinned & moved to Trash");
                } else {
                  toast.success("Note Moved to Trash");
                  dispatchNotes({ type: "TRASH-NOTE", payload: _id });
                }
              }}
            >
              delete
            </i>
          </div>
        </div>
        {labelBox && <LabelBox _id={_id} />}
        {colorBox && <ColorBox _id={_id} />}
      </div>
    </>
  );
};
