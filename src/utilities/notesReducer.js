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
      };
    case "EDIT-NOTE":
      return {
        ...state,
        setEditBox: "show-edit-box",
        _id: payload._id,
        title: payload.title,
        body: payload.body,
        isEditing: payload.isEditing,
        isPinned: payload.isPinned,
      };
    case "CANCEL-NOTE":
      return { ...state, setEditBox: "hide-edit-box", isEditing: false };
    case "EDIT-TITLE":
      return { ...state, title: payload };
    case "EDIT-BODY":
      return { ...state, body: payload };
    case "SAVE-NOTE":
      return {
        ...state,
        setEditBox: payload.editBoxStatus,
        notesList: saveNewNote(state, payload),
      };
    case "EDITOR-PIN":
      return { ...state, isPinned: payload };
    case "NOTE-PIN":
      return {
        ...state,
        isPinned: !payload.isPinned,
        noteList: togglePin(state, payload),
      };
    case "DELETE-NOTE":
      return { ...state, notesList: deleteNote(state, payload) };
  }
};

export const notesInitialState = {
  notesList: [],
  setEditBox: "hide-edit-box",
  _id: "",
  title: "",
  body: "",
  isEditing: false,
  isPinned: false,
};

function saveNewNote(state, payload) {
  console.log("payload", payload);
  if (payload.editBoxStatus === "hide-edit-box") {
    //To Edit the Existing Note

    if (state.isEditing) {
      for (let i = 0; i < state.notesList.length; i++) {
        if (state.notesList[i]._id == state._id) {
          state.notesList[i] = {
            ...state.notesList[i],
            _id: state._id,
            title: state.title,
            body: state.body,
            isPinned: state.isPinned,
          };
        }
      }
      return state.notesList;
    }
    //To Create new Note
    else {
      return [
        ...state.notesList,
        {
          _id: payload._id,
          title: payload.title,
          body: payload.body,
          isPinned: payload.isPinned,
        },
      ];
    }
  }
  //On Empty Fields entered by user, state will not change.
  else {
    return state.notesList;
  }
}

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

function deleteNote(state, payload) {
  return state.notesList.filter((note) => note._id !== payload);
}
