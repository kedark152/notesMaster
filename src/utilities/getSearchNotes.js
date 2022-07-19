export const getSearchNotes = (notesList, searchQuery) => {
  if (searchQuery.trim()) {
    return notesList.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }
  return notesList;
};
