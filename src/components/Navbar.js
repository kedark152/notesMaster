import "../styles/layouts/navbar.css"


export const Navbar = () =>{
    return (<>
            <nav id="nav-bar">
            <div className="nav-brand fs-md"><a href="../index.html">NotesMaster</a></div>
            <div className="search-field">
                <i className="material-icons" id="search-icon">search</i>
                <i className="material-icons" id="filter-icon">filter_list</i>
                <input
                type="text"
                name="search-bar"
                id="search-bar"
                placeholder="Search"
                />
            </div>
            <ul className="nav-pills fs-sm-plus fw-bold">
                <li><i className="material-icons">grid_view</i></li>
                <li><a href="#">Login</a></li>
                <li>
                <a href="https://github.com/kedark152/notesMaster" target="_blank" rel="noreferrer"
                    ><i className="fab fa-github"></i
                ></a>
                </li>
            </ul>
            </nav>
    
    </>)
}
