export const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case "CREATE-NEW-NOTE":
      return {
        ...state,
        setEditBox: "show-edit-box",
        _id: "",
        title: "",
        body: "",
        isEditing: false,
        isPinned: false,
        priority: "none",
        noteColor: "noteWhite",
      };

    case "OPEN-EDIT-NOTE":
      return {
        ...state,
        setEditBox: "show-edit-box",
        _id: payload._id,
        title: payload.title,
        body: payload.body,
        isEditing: payload.isEditing,
        isPinned: payload.isPinned,
        noteColor: payload.noteColor,
        priority: "none",
      };

    case "CANCEL-NOTE":
      return {
        ...state,
        setEditBox: "hide-edit-box",
        isEditing: false,
        noteColor: "noteWhite",
      };

    case "EDIT-TITLE":
      return { ...state, title: payload };

    case "EDIT-BODY":
      return { ...state, body: payload };

    case "SAVE-NOTE":
      return {
        ...state,
        setEditBox: payload.editBoxStatus,
        notesList: payload,
      };
    case "UPDATE-NOTE":
      return {
        ...state,
        setEditBox: payload.editBoxStatus,
        notesList: payload,
      };

    case "EDITOR-PIN":
      return { ...state, isPinned: payload };

    case "NOTE-PIN":
      return {
        ...state,
        isPinned: !payload.isPinned,
        notesList: togglePin(state, payload),
      };

    case "DELETE-FROM-TRASH":
      return {
        ...state,
        trashList: payload,
      };

    case "ARCHIVE-NOTE":
    case "UNARCHIVE-NOTE":
      return {
        ...state,
        notesList: payload.notes,
        archivesList: payload.archives,
      };
    case "TRASH-NOTE":
    case "RESTORE-FROM-TRASH":
      return {
        ...state,
        notesList: payload.notes,
        trashList: payload.trash,
      };

    case "ADD-NEW-LABEL":
      return {
        ...state,
        allLabels: [...state.allLabels, payload.labelName], //add to main labels list
      };
    case "TOGGLE-TICK-LABEL":
      return {
        ...state,
        notesList: toggleTickLabel(state, payload), // Toggle on tick from notes List, particular note.
      };
    case "CHANGE-PRIORITY":
      return {
        ...state,
        priority: payload,
      };
    case "CHANGE-COLOR":
      return {
        ...state,
        notesList: changeNoteColor(state, payload),
      };
    case "UPDATE-STATE-ON-LOGIN":
      return {
        ...state,
        notesList: payload.notes,
        trashList: payload.trash,
        archivesList: payload.archive,
      };
    case "CLEAR-NOTES-STATE":
      return notesInitialState;
  }
};

export const notesInitialState = {
  notesList: [],
  trashList: [],
  archivesList: [],
  setEditBox: "hide-edit-box",
  _id: "", //helper variables
  title: "",
  body: "",
  isEditing: false,
  isPinned: false,
  allLabels: [],
  priority: "none",
};

function togglePin(state, payload) {
  for (let i = 0; i < state.notesList.length; i++) {
    if (state.notesList[i]._id == payload._id) {
      state.notesList[i] = {
        ...state.notesList[i],
        isPinned: !payload.isPinned,
      };
    }
  }
  return state.notesList;
}

function toggleTickLabel(state, payload) {
  let indexOfNote = state.notesList.findIndex(
    (note) => note._id == payload.noteId
  );

  state.notesList[indexOfNote] = {
    ...state.notesList[indexOfNote],
    labelsData: payload.labelCheckedStatus
      ? [
          ...new Set(
            state.notesList[indexOfNote].labelsData.concat(payload.labelName)
          ),
        ] //Add Label to List of particular Note on tick, ..new Set(char) is to remove duplicate values
      : state.notesList[indexOfNote].labelsData.filter(
          (label) => label !== payload.labelName
        ), //remove Label from List of particular Note on Untick
  };

  return state.notesList;
}

function changeNoteColor(state, payload) {
  let indexOfNote = state.notesList.findIndex(
    (note) => note._id == payload.noteId
  );
  state.notesList[indexOfNote] = {
    ...state.notesList[indexOfNote],
    noteColor: payload.colorName,
  };
  return state.notesList;
}
