import "../styles/pages/landingpage.css";
import "../styles/utils/variable.css";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <div className="container-landing-pg flex">
        <div className="text-section">
          <h1 className="brand-name fw-bold mg-sm">
            <span className="primary-color">Notes</span>
            <span className="dark-green">Master</span>
            <img
              className="notes-icon"
              src="https://res.cloudinary.com/dvuh4fz9d/image/upload/v1649178068/notes_heyg7e.png"
            />
          </h1>
          <div className="flex-column">
            <h2 className="brand-slogan  mg-top-xlg mg-bottom-sm mg-x-sm primary-color">
              Write, Organize, Save and Access your Notes anywhere and at
              anytime
            </h2>
            <p className="brand-description  mg-x-sm mg-bottom-xlg fw-bold dark-green">
              Create and Save your Notes, Tasks, Ideas, Important Info, Links
              before missing out. Systematically Organize them to quickly access
              it.
            </p>
          </div>
          <div className="page-links-section align-center pd-sm">
            <Link
              to="/signup"
              className="btn btn-solid fw-bold primary-bg-color"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="primary-color fw-bold no-txt-decoration"
            >
              Already Have an Account?
            </Link>
          </div>
        </div>
        <img
          className="hero-image"
          src="https://res.cloudinary.com/dvuh4fz9d/image/upload/v1649170922/undraw_thought_process_re_om58_1_nwgyfi.svg"
        />
      </div>
    </>
  );
};
