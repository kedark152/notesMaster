import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { NotesCard } from "../components/NotesCard";
import { EditNotesCard } from "../components/EditNotesCard";
import { useNotes } from "../context/notes-context";
import { Link } from "react-router-dom";

export const Home = () => {
  const { notesState, dispatchNotes } = useNotes();

  const pinnedNotesList = notesState.notesList.filter((note) => note.isPinned);
  const othersNotesList = notesState.notesList.filter((note) => !note.isPinned);
  return (
    <>
      <Navbar />
      <EditNotesCard />
      <div className="home-page-container flex">
        <aside className="sidebar">
          <div className="cell-block flex-column">
            <Link tabIndex="1" id="cell" to="/home">
              <i className="material-icons">home</i>Home
            </Link>
            <a tabIndex="2" id="cell" href="#">
              <i className="material-icons">label</i>Label
            </a>
            <a tabIndex="3" id="cell">
              <i className="material-icons">archive</i>Archive
            </a>
            <a tabIndex="4" id="cell">
              <i className="material-icons">delete</i>Trash
            </a>
            <a tabIndex="5" id="cell">
              <i className="material-icons">account_circle</i>Profile
            </a>
          </div>
          <a
            className="btn btn-solid btn-new-note primary-bg-color"
            onClick={() => dispatchNotes({ type: "CREATE-NEW-NOTE" })}
          >
            Create New Note
          </a>
        </aside>

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
