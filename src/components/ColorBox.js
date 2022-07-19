/* eslint-disable react/prop-types */
import "../styles/utils/variable.css";
import "../styles/component/colorbox.css";
import { useNotes } from "../context/notes-context";
import { v4 as uuid } from "uuid";
import { updateNoteBgColor } from "../services/notesServices";
import { useAuth } from "../context/auth-context";

export const ColorBox = ({ _id, setColorBox }) => {
  const { notesState, dispatchNotes } = useNotes();
  const { auth } = useAuth();
  const noteColorsList = [
    "noteWhite",
    "noteRed",
    "noteGreen",
    "noteBlue",
    "noteOrange",
    "noteViolet",
    "noteGrad1",
    "noteGrad2",
    "noteGrad3",
  ];
  const colorChangeHandler = (noteId) => {
    let indexOfNote = notesState.notesList.findIndex(
      (note) => note._id == noteId
    );
    setTimeout(function () {
      let notesData = notesState.notesList[indexOfNote];

      updateNoteBgColor({ auth, noteData: notesData, dispatchNotes });
    }, 500);
  };
  return (
    <>
      <div className="color-box-container">
        <i
          className="material-icons"
          id="cancel-color-box-btn"
          onClick={() => setColorBox((colorBox) => !colorBox)}
        >
          cancel
        </i>
        {noteColorsList.map((noteColorName) => (
          <div
            key={uuid()}
            className={`color-select ${noteColorName}`}
            onClick={() => {
              {
                dispatchNotes({
                  type: "CHANGE-COLOR",
                  payload: { noteId: _id, colorName: noteColorName },
                });
                colorChangeHandler(_id);
              }
            }}
          ></div>
        ))}
      </div>
    </>
  );
};
