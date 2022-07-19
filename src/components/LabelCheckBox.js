/* eslint-disable react/prop-types */
import { useNotes } from "../context/notes-context";
import { updateNoteLabels } from "../services/notesServices";
import { useAuth } from "../context/auth-context";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
export const LabelCheckBox = ({ labelId, labelName, noteId }) => {
  const { notesState, dispatchNotes } = useNotes();
  const { auth } = useAuth();
  const activeLabels = () => {
    for (let i = 0; i < notesState.notesList.length; i++) {
      if (notesState.notesList[i]._id == noteId) {
        return notesState.notesList[i].labelsData;
      }
    }
  };

  const labelChangeHandler = (noteId) => {
    let indexOfNote = notesState.notesList.findIndex(
      (note) => note._id == noteId
    );
    setTimeout(function () {
      let notesData = notesState.notesList[indexOfNote];

      updateNoteLabels({ auth, noteData: notesData, dispatchNotes });
    }, 500);
  };

  return (
    <>
      <div className="checkbox-field align-center">
        <input
          type="checkbox"
          id={labelId}
          onClick={(e) => {
            // e.stopImmediatePropagation;
            let labelCheckedStatus = e.target.checked;
            dispatchNotes({
              type: "TOGGLE-TICK-LABEL",
              payload: { noteId, labelName, labelCheckedStatus },
            });
            labelChangeHandler(noteId);
            labelCheckedStatus
              ? toast.success(`Added Label ${labelName} to Note`)
              : toast.success(`Removed Label ${labelName} from Note`);
          }}
          defaultChecked={activeLabels().includes(labelName)}
        />
        <label htmlFor={labelId}>{labelName}</label>
      </div>
    </>
  );
};
