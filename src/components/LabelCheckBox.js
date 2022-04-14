/* eslint-disable react/prop-types */
import { useNotes } from "../context/notes-context";
export const LabelCheckBox = ({ labelId, labelName, noteId }) => {
  const { notesState, dispatchNotes } = useNotes();

  const activeLabels = () => {
    for (let i = 0; i < notesState.notesList.length; i++) {
      if (notesState.notesList[i]._id == noteId) {
        return notesState.notesList[i].labelsData;
      }
    }
  };
  return (
    <>
      <div className="checkbox-field align-center">
        <input
          type="checkbox"
          id={labelId}
          onChange={(e) => {
            // e.stopImmediatePropagation;
            let labelCheckedStatus = e.target.checked;
            dispatchNotes({
              type: "TOGGLE-TICK-LABEL",
              payload: { noteId, labelName, labelCheckedStatus },
            });
          }}
          checked={activeLabels().includes(labelName)}
        />
        <label htmlFor={labelId}>{labelName}</label>
      </div>
    </>
  );
};
