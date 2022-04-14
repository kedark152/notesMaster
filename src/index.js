import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { NotesProvider } from "./context/notes-context";
import App from "./App";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NotesProvider>
        <App />
      </NotesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
