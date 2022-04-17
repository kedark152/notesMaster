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
        priority: "none",
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
        notesList: togglePin(state, payload),
      };

    case "PERMANENT-DELETE-NOTE":
      return {
        ...state,
        notesList: deleteNote(state, payload),
      };

    case "ARCHIVE-NOTE":
      return {
        ...state,
        notesList: archiveNote(state, payload),
      };
    case "TRASH-NOTE":
      return {
        ...state,
        notesList: trashNote(state, payload),
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
  }
};

export const notesInitialState = {
  notesList: [],
  setEditBox: "hide-edit-box",
  _id: "", //helper variables
  title: "",
  body: "",
  isEditing: false,
  isPinned: false,
  allLabels: [],
  priority: "none",
};

function saveNewNote(state, payload) {
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
            priority: state.priority,
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
          labelsData: payload.labelsData,
          priority: state.priority,
          noteColor: "noteWhite",
          noteCreatedDate: payload.noteCreatedDate,
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

function archiveNote(state, payload) {
  for (let i = 0; i < state.notesList.length; i++) {
    if (state.notesList[i]._id == payload) {
      state.notesList[i] = {
        ...state.notesList[i],
        isArchived: !state.notesList[i].isArchived,
      };
    }
  }
  return state.notesList;
}

function trashNote(state, payload) {
  for (let i = 0; i < state.notesList.length; i++) {
    if (state.notesList[i]._id == payload) {
      state.notesList[i] = {
        ...state.notesList[i],
        isTrashed: !state.notesList[i].isTrashed,
      };
    }
  }
  return state.notesList;
}

function deleteNote(state, payload) {
  return state.notesList.filter((note) => note._id !== payload);
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
