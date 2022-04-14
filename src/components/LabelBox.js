/* eslint-disable react/prop-types */
import "../styles/component/labelBox.css";
import { useNotes } from "../context/notes-context";
import { useState } from "react";
import { LabelCheckBox } from "./LabelCheckBox";
import { v4 as uuid } from "uuid";

export const LabelBox = ({ _id }) => {
  const { notesState, dispatchNotes } = useNotes();

  const [labelValue, setLabelValue] = useState("");
  const typeNewLabel = (e) => {
    let labelName = e.target.value;
    if (e.keyCode === 13) {
      setLabelValue("");
      dispatchNotes({ type: "ADD-NEW-LABEL", payload: { _id, labelName } });
    }
  };

  return (
    <>
      <div className="add-label-container show-label-box">
        <h5>Label Note</h5>

        <div className="label-input-wrapper">
          <input
            type="text"
            name="typingLabel"
            id="typing-label"
            placeholder="Type & press enter to add a new label."
            value={labelValue}
            onChange={(e) => setLabelValue(e.target.value)}
            onKeyUp={(e) => typeNewLabel(e)}
          />
        </div>
        <div className="checkbox-input-wrapper mg-top-xsm">
          {notesState.allLabels.map((label) => (
            <LabelCheckBox
              key={uuid()}
              labelId={uuid()}
              labelName={label}
              noteId={_id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
