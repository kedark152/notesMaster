import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { TrashNotesCard } from "../components/TrashNotesCard";
import { useNotes } from "../context/notes-context";
import { Sidebar } from "../components/Sidebar";

export const TrashPage = () => {
  const { notesState } = useNotes();

  const trashedNotesList = notesState.notesList.filter(
    (note) => note.isTrashed
  );
  return (
    <>
      <Navbar />

      <div className="home-page-container flex">
        <Sidebar />

        <div className="notes-listing flex-column-center">
          <div className="fw-bold mg-y-sm">
            TRASH NOTES ({trashedNotesList.length})
          </div>

          {trashedNotesList.map((note) => (
            <TrashNotesCard key={note._id} noteDetails={note} />
          ))}
        </div>
      </div>
    </>
  );
};
