/* eslint-disable react/prop-types */
import "../styles/utils/variable.css";
import "../styles/component/colorbox.css";
import { useNotes } from "../context/notes-context";
import { v4 as uuid } from "uuid";

export const ColorBox = ({ _id }) => {
  const { dispatchNotes } = useNotes();
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

  return (
    <>
      <div className="color-box-container">
        {noteColorsList.map((noteColorName) => (
          <div
            key={uuid()}
            className={`color-select ${noteColorName}`}
            onClick={() =>
              dispatchNotes({
                type: "CHANGE-COLOR",
                payload: { noteId: _id, colorName: noteColorName },
              })
            }
          ></div>
        ))}
      </div>
    </>
  );
};
