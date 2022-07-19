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
import { moveToTrash } from "../services/trashServices";
import { useAuth } from "../context/auth-context";
import { archiveNote } from "../services/archiveServices";
import { updateNotePin } from "../services/notesServices";

export const NotesCard = ({ noteDetails, list }) => {
  const { _id, title, body, isPinned } = noteDetails;
  const { dispatchNotes } = useNotes();
  const { auth } = useAuth();

  const [labelBox, setLabelBox] = useState(false);
  const [colorBox, setColorBox] = useState(false);

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
  const notePinChangeHandler = () => {
    setTimeout(function () {
      updateNotePin({
        auth,
        noteData: { ...noteDetails, isPinned: !isPinned },
        dispatchNotes,
      });
    }, 500);
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
              dispatchNotes({
                type: "NOTE-PIN",
                payload: {
                  _id,
                  title,
                  body,
                  isPinned,
                },
              });
              notePinChangeHandler();
              if (!isPinned) {
                toast.success("Note Pinned");
              } else {
                toast.success("Note Unpinned");
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
            list[getIndexOfNote(_id)].noteCreatedDate
          }`}</p>
          <div className="icon-buttons align-center">
            <i
              className="material-icons"
              onClick={() =>
                dispatchNotes({
                  type: "OPEN-EDIT-NOTE",
                  payload: {
                    _id,
                    title,
                    body,
                    isEditing: true,
                    isPinned: isPinned,
                    noteColor: displayNoteColor(_id),
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
                if (isPinned) {
                  dispatchNotes({
                    type: "NOTE-PIN",
                    payload: {
                      _id,
                      title,
                      body,
                      isPinned,
                    },
                  });
                  archiveNote({
                    auth,
                    noteId: _id,
                    dispatchNotes,
                  });
                } else {
                  archiveNote({
                    auth,
                    noteId: _id,
                    dispatchNotes,
                  });
                }
              }}
            >
              archive
            </i>
            <i
              className="material-icons"
              onClick={() => {
                if (isPinned) {
                  dispatchNotes({
                    type: "NOTE-PIN",
                    payload: {
                      _id,
                      title,
                      body,
                      isPinned,
                    },
                  });
                  moveToTrash({
                    token: auth.token,
                    noteId: _id,
                    dispatchNotes,
                  });
                } else {
                  moveToTrash({
                    token: auth.token,
                    noteId: _id,
                    dispatchNotes,
                  });
                }
              }}
            >
              delete
            </i>
          </div>
        </div>
        {labelBox && <LabelBox _id={_id} />}
        {colorBox && <ColorBox _id={_id} setColorBox={setColorBox} />}
      </div>
    </>
  );
};
