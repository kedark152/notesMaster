export const getFilteredNotes = (state, notesList) => {
  //Filter By Priority
  if (state.filterByPriority.length > 0) {
    let dummyList = [];
    state.filterByPriority.map(
      (priorityName) =>
        (dummyList = dummyList.concat(
          notesList.filter((note) => note.priority.includes(priorityName))
        ))
    );
    notesList = [...dummyList];
  }
  //Filter By Labels
  if (state.filterByLabels.length > 0) {
    let dummyList = [];
    state.filterByLabels.map(
      (labelsName) =>
        (dummyList = dummyList.concat(
          notesList.filter((note) => note.labelsData.includes(labelsName))
        ))
    );
    notesList = [...dummyList];
  }

  //Sort by Date
  if (state.sortByDate === "newestFirst") {
    //newest first
    notesList = notesList.sort(
      (note1, note2) =>
        new Date(note2.noteCreatedDate) - new Date(note1.noteCreatedDate)
    );
  }
  if (state.sortByDate === "oldestFirst") {
    notesList = notesList.sort(
      (note1, note2) =>
        new Date(note1.noteCreatedDate) - new Date(note2.noteCreatedDate)
    );
  }

  let highNotes = notesList.filter((note) => note.priority == "high");
  let mediumNotes = notesList.filter((note) => note.priority == "medium");
  let lowNotes = notesList.filter((note) => note.priority == "low");
  let noneNotes = notesList.filter((note) => note.priority == "none");
  if (state.sortByPriority === "HighToLow") {
    notesList = [...highNotes, ...mediumNotes, ...lowNotes, ...noneNotes];
  }
  if (state.sortByPriority === "LowToHigh") {
    notesList = [...noneNotes, ...lowNotes, ...mediumNotes, ...highNotes];
  }

  return notesList;
};
