import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export const ProfilePage = () => {
  return (
    <>
      <Navbar />

      <div className="home-page-container flex">
        <Sidebar />

        <div className="notes-listing flex-column-center">
          <div className="fw-bold mg-y-sm">Profile Page</div>
        </div>
      </div>
    </>
  );
};
