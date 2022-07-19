import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { NotesProvider } from "./context/notes-context";
import App from "./App";
import { makeServer } from "./server";
import { FilterProvider } from "./context/filter-context";
import { AuthProvider } from "./context/auth-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NotesProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </NotesProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
