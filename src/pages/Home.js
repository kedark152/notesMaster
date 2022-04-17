import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { NotesCard } from "../components/NotesCard";
import { EditNotesCard } from "../components/EditNotesCard";
import { useNotes } from "../context/notes-context";
import { Sidebar } from "../components/Sidebar";
import { FiltersBox } from "../components/FiltersBox";
import { getFilteredNotes } from "../utilities/getFilteredNotes";
import { useFilter } from "../context/filter-context";
import { toast } from "react-toastify";

export const Home = () => {
  const { notesState } = useNotes();
  const { filterState, dispatchFilter } = useFilter();

  const pinnedNotesList = notesState.notesList.filter(
    (note) => note.isPinned && !note.isArchived && !note.isTrashed
  );
  const othersNotesList = notesState.notesList.filter(
    (note) => !note.isPinned && !note.isArchived && !note.isTrashed
  );

  const allNotesList = notesState.notesList.filter((note) => !note.isTrashed);
  const filteredNotesList = getFilteredNotes(filterState, allNotesList);

  return (
    <>
      <Navbar />
      <EditNotesCard />
      <FiltersBox />

      <div className="home-page-container flex">
        <Sidebar />

        <div className="notes-listing flex-column-center">
          {filterState.isFiltering && (
            <div className="fw-bold mg-y-sm">
              Filtered Notes ({filteredNotesList.length})
              <a
                className="filter-clear-btn mg-x-xsm"
                onClick={() => {
                  dispatchFilter({ type: "CLEAR-FILTERS" });
                  toast.success("Filter Cleared");
                }}
              >
                CLEAR
              </a>
              {filteredNotesList.map((note) => (
                <NotesCard key={note._id} noteDetails={note} />
              ))}
            </div>
          )}

          {!filterState.isFiltering && (
            <div className="fw-bold mg-y-sm">
              PINNED ({pinnedNotesList.length})
              {pinnedNotesList.map((note) => (
                <NotesCard key={note._id} noteDetails={note} />
              ))}
              <div className="fw-bold mg-y-sm">
                UNPINNED ({othersNotesList.length})
              </div>
              {othersNotesList.map((note) => (
                <NotesCard key={note._id} noteDetails={note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
