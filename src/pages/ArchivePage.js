import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { NotesCard } from "../components/NotesCard";
import { EditNotesCard } from "../components/EditNotesCard";
import { useNotes } from "../context/notes-context";
import { Sidebar } from "../components/Sidebar";

export const ArchivePage = () => {
  const { notesState } = useNotes();

  const othersArchiveNotesList = notesState.notesList.filter(
    (note) => !note.isPinned && note.isArchived && !note.isTrashed
  );
  return (
    <>
      <Navbar />
      <EditNotesCard />

      <div className="home-page-container flex">
        <Sidebar />

        <div className="notes-listing flex-column-center">
          <div className="fw-bold mg-y-sm">
            ARCHIVED NOTES ({othersArchiveNotesList.length})
          </div>

          {othersArchiveNotesList.map((note) => (
            <NotesCard key={note._id} noteDetails={note} />
          ))}
        </div>
      </div>
    </>
  );
};
