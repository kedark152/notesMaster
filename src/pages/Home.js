import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { NotesCard } from "../components/NotesCard";
import { EditNotesCard } from "../components/EditNotesCard";
import { useNotes } from "../context/notes-context";
import { Sidebar } from "../components/Sidebar";

export const Home = () => {
  const { notesState } = useNotes();

  const pinnedNotesList = notesState.notesList.filter(
    (note) => note.isPinned && !note.isArchived && !note.isTrashed
  );
  const othersNotesList = notesState.notesList.filter(
    (note) => !note.isPinned && !note.isArchived && !note.isTrashed
  );
  return (
    <>
      <Navbar />
      <EditNotesCard />

      <div className="home-page-container flex">
        <Sidebar />

        <div className="notes-listing flex-column-center">
          <div className="fw-bold mg-y-sm">
            PINNED ({pinnedNotesList.length})
          </div>

          {pinnedNotesList.map((note) => (
            <NotesCard key={note._id} noteDetails={note} />
          ))}

          <div className="fw-bold mg-y-sm">
            OTHERS ({othersNotesList.length})
          </div>

          {othersNotesList.map((note) => (
            <NotesCard key={note._id} noteDetails={note} />
          ))}
        </div>
      </div>
    </>
  );
};
