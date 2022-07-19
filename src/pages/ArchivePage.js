import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { ArchiveNotesCard } from "../components/ArchiveNotesCard";
import { EditNotesCard } from "../components/EditNotesCard";
import { useNotes } from "../context/notes-context";
import { Sidebar } from "../components/Sidebar";
import { NoNotes } from "../components/NoNotes";

export const ArchivePage = () => {
  const { notesState } = useNotes();

  const notesArchivesList = notesState.archivesList;
  return (
    <>
      <Navbar />
      <EditNotesCard />

      <div className="home-page-container flex">
        <Sidebar />

        <div className="notes-listing flex-column-center">
          <div className="fw-bold mg-y-sm">
            ARCHIVED NOTES ({notesArchivesList.length})
          </div>

          {notesArchivesList.map((note) => (
            <ArchiveNotesCard
              key={note._id}
              noteDetails={note}
              list={notesArchivesList}
            />
          ))}

          {notesArchivesList.length == 0 && (
            <NoNotes icon="archive" text={`No notes archived yet`} />
          )}
        </div>
      </div>
    </>
  );
};
