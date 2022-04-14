/* eslint-disable react/prop-types */

import "../styles/component/notescard.css";
import "../styles/utils/variable.css";
import { useState } from "react";
import { useNotes } from "../context/notes-context";
import { getCurrentDate } from "../utilities/getCurrentDate";
import { LabelBox } from "./LabelBox";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { LabelChip } from "./LabelChip";
import { ColorBox } from "./ColorBox";

export const NotesCard = ({ noteDetails }) => {
  const { _id, title, body, isPinned } = noteDetails;
  const { notesState, dispatchNotes } = useNotes();

  const [labelBox, setLabelBox] = useState(false);
  const [colorBox, setColorBox] = useState(false);

  const displayLabels = (_id) => {
    for (let i = 0; i < notesState.notesList.length; i++) {
      if (notesState.notesList[i]._id == _id) {
        return notesState.notesList[i].labelsData;
      }
    }
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
    for (let i = 0; i < notesState.notesList.length; i++) {
      if (notesState.notesList[i]._id == _id) {
        let priorityName = notesState.notesList[i].priority;
        switch (notesState.notesList[i].priority) {
          case "none":
            return { priority: priorityName, priorityClass: "priority-none" };
          case "high":
            return { priority: priorityName, priorityClass: "priority-high" };
          case "medium":
            return { priority: priorityName, priorityClass: "priority-medium" };
          case "low":
            return { priority: priorityName, priorityClass: "priority-low" };
        }
      }
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
            onClick={() =>
              dispatchNotes({
                type: "NOTE-PIN",
                payload: { _id, title, body, isPinned },
              })
            }
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
          {console.log(notesState)}
          <div
            className={`show-priority ${displayPriority(_id).priorityClass}`}
          >{`${displayPriority(_id).priority}`}</div>
        </div>
        <div className="bottom-section align-center">
          <p className="creation-date">{`Created on ${getCurrentDate()}`}</p>
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
            <i className="material-icons">archive</i>
            <i
              className="material-icons"
              onClick={() => {
                toast.success("Deleted Note");
                dispatchNotes({ type: "DELETE-NOTE", payload: _id });
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
