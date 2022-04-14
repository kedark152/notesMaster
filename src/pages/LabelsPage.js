import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { NotesCard } from "../components/NotesCard";
import { EditNotesCard } from "../components/EditNotesCard";
import { useNotes } from "../context/notes-context";
import { Sidebar } from "../components/Sidebar";
import "../styles/pages/labelsPage.css";
import { v4 as uuid } from "uuid";

export const LabelsPage = () => {
  const { notesState } = useNotes();
  const lablesList = notesState.allLabels;

  const displayLabeledNotes = (label) => {
    const labledNotesList = notesState.notesList.filter((note) =>
      note.labelsData.includes(label)
    );
    return (
      <>
        {labledNotesList.map((note) => (
          <NotesCard key={note._id} noteDetails={note} />
        ))}
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
          {lablesList.map((label) => (
            <div key={uuid()} className="fw-bold mg-y-sm">
              {label}
              {displayLabeledNotes(label)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
