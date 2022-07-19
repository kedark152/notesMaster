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
import { getSearchNotes } from "../utilities/getSearchNotes";
import { useState } from "react";
import { toast } from "react-toastify";
import { NoNotes } from "../components/NoNotes";

export const Home = () => {
  const { notesState, dispatchNotes } = useNotes();
  const { filterState } = useFilter();

  const pinnedNotesList = notesState.notesList.filter((note) => note.isPinned);
  const othersNotesList = notesState.notesList.filter((note) => !note.isPinned);

  const allNotesList = notesState.notesList;
  const filteredNotesList = getFilteredNotes(filterState, allNotesList);
  const [searchQuery, setSearchQuery] = useState("");
  const searchNotesList = getSearchNotes(allNotesList, searchQuery);

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <EditNotesCard />
      <FiltersBox />

      <div className="home-page-container flex">
        <Sidebar />

        {searchQuery.length < 2 && (
          <div className="notes-listing flex-column-center">
            {filterState.isFiltering && (
              <div className="fw-bold mg-y-sm">
                Filtered Notes ({filteredNotesList.length})
                {filteredNotesList.map((note) => (
                  <NotesCard
                    key={note._id}
                    noteDetails={note}
                    list={allNotesList}
                  />
                ))}
              </div>
            )}
            {allNotesList.length == 0 && (
              <NoNotes icon="description" text="Add a Note to Appear Here" />
            )}
            {!filterState.isFiltering && allNotesList.length > 0 && (
              <div className="fw-bold mg-y-sm">
                PINNED ({pinnedNotesList.length})
                {pinnedNotesList.map((note) => (
                  <NotesCard
                    key={note._id}
                    noteDetails={note}
                    list={pinnedNotesList}
                  />
                ))}
                <div className="fw-bold mg-y-sm">
                  UNPINNED ({othersNotesList.length})
                </div>
                {othersNotesList.map((note) => (
                  <NotesCard
                    key={note._id}
                    noteDetails={note}
                    list={othersNotesList}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {searchQuery.length > 1 && (
          <div className="notes-listing flex-column-center">
            <div className="fw-bold mg-y-sm">
              Search Query Notes ({searchNotesList.length})
              <a
                className="search-clear-link mg-x-xsm"
                onClick={() => {
                  setSearchQuery("");
                  toast.success("Search Query Cleared");
                }}
              >
                CLEAR SEARCH
              </a>
              {searchNotesList.map((note) => (
                <NotesCard
                  key={note._id}
                  noteDetails={note}
                  list={searchNotesList}
                />
              ))}
            </div>
          </div>
        )}
        <a
          className="btn-float-action btn-add-float"
          onClick={() => dispatchNotes({ type: "CREATE-NEW-NOTE" })}
        >
          <i className="material-icons" id="add-note-icon">
            add
          </i>
        </a>
      </div>
    </>
  );
};
