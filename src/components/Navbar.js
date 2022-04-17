import "../styles/layouts/navbar.css";
import { Link } from "react-router-dom";
import { useFilter } from "../context/filter-context";
export const Navbar = () => {
  const { dispatchFilter } = useFilter();
  return (
    <>
      <nav id="nav-bar">
        <div className="nav-brand fs-md">
          <Link to="/">NotesMaster</Link>
        </div>
        <div className="search-field">
          <i className="material-icons" id="search-icon">
            search
          </i>
          <i
            className="material-icons"
            id="filter-icon"
            onClick={() => dispatchFilter({ type: "SHOW-FILTER-BOX" })}
          >
            filter_alt
          </i>
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="Search"
          />
        </div>
        <ul className="nav-pills fs-sm-plus fw-bold">
          <li>
            <i className="material-icons">grid_view</i>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a
              href="https://github.com/kedark152/notesMaster"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
