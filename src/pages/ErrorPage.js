import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";

import { EditNotesCard } from "../components/EditNotesCard";

import { Sidebar } from "../components/Sidebar";
import { NoNotes } from "../components/NoNotes";

export const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <EditNotesCard />

      <div className="home-page-container flex">
        <Sidebar />

        <div className="notes-listing flex-column-center">
          <NoNotes
            icon="sentiment_dissatisfied"
            text={`404 Error, Page Not Found!`}
          />
        </div>
      </div>
    </>
  );
};
