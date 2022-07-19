import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { NotesCard } from "../components/NotesCard";
import { EditNotesCard } from "../components/EditNotesCard";
import { useNotes } from "../context/notes-context";
import { Sidebar } from "../components/Sidebar";
import "../styles/pages/labelsPage.css";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { NoNotes } from "../components/NoNotes";

export const LabelsPage = () => {
  const { notesState } = useNotes();
  // const lablesList = notesState.allLabels;
  const { labelName } = useParams();
  const displayLabeledNotes = (label) => {
    const labledNotesList = notesState.notesList.filter((note) =>
      note.labelsData.includes(label)
    );
    return (
      <>
        {labledNotesList.length > 0 &&
          labledNotesList.map((note) => (
            <NotesCard
              key={note._id}
              noteDetails={note}
              list={labledNotesList}
            />
          ))}
        {labledNotesList.length == 0 && (
          <NoNotes icon="label" text={`No notes with ${labelName} label yet`} />
        )}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <EditNotesCard />
      <div className="labels-page-container flex">
        <Sidebar />

        <div className="labels-notes-listing flex-column-center">
          <div key={uuid()} id={uuid()} className="fw-bold mg-y-sm">
            {displayLabeledNotes(labelName)}
          </div>
        </div>
      </div>
    </>
  );
};
