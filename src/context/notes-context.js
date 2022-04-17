/* eslint-disable react/prop-types */
import { useContext, createContext, useReducer } from "react";
import { notesReducer, notesInitialState } from "../reducer/notesReducer";

const NotesContext = createContext(notesInitialState);

export const NotesProvider = ({ children }) => {
  const [notesState, dispatchNotes] = useReducer(
    notesReducer,
    notesInitialState
  );

  return (
    <NotesContext.Provider value={{ notesState, dispatchNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
