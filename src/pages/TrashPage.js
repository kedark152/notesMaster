import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { TrashNotesCard } from "../components/TrashNotesCard";
import { useNotes } from "../context/notes-context";
import { Sidebar } from "../components/Sidebar";
import { NoNotes } from "../components/NoNotes";

export const TrashPage = () => {
  const { notesState } = useNotes();

  const trashedNotesList = notesState.trashList;

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
            <TrashNotesCard
              key={note._id}
              noteDetails={note}
              list={trashedNotesList}
            />
          ))}
          {trashedNotesList.length == 0 && (
            <NoNotes icon="delete" text={`No notes in Trash yet`} />
          )}
        </div>
      </div>
    </>
  );
};
