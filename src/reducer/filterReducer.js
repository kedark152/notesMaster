export const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case "SHOW-FILTER-BOX":
      return {
        ...state,
        setFilterBox: "show-filter-box",
      };
    case "HIDE-FILTER-BOX":
      return {
        ...state,
        setFilterBox: "hide-filter-box",
      };
    case "SORT-BY-DATE":
      return {
        ...state,
        sortByDate: payload,
        isFiltering: true,
      };
    case "SORT-BY-PRIORITY":
      return {
        ...state,
        sortByPriority: payload,
        isFiltering: true,
      };
    case "FILTER-BY-PRIORITY":
      return {
        ...state,
        filterByPriority: getTickedPriority(state, payload),
        isFiltering: true,
      };
    case "FILTER-BY-LABELS":
      return {
        ...state,
        filterByLabels: getTickedLabels(state, payload),
        isFiltering: true,
      };
    case "CLEAR-FILTERS":
      return filterInitialState;
  }
};

export const filterInitialState = {
  setFilterBox: "hide-filter-box",
  sortByDate: "",
  sortByPriority: "",
  filterByPriority: [],
  filterByLabels: [],
  isFiltering: false,
};

const getTickedPriority = (state, payload) => {
  let statePriority = state.filterByPriority;
  if (statePriority.includes(payload)) {
    return statePriority.filter((name) => name !== payload);
  } else {
    return [...state.filterByPriority, payload];
  }
};
const getTickedLabels = (state, payload) => {
  let stateLabels = state.filterByLabels;
  if (stateLabels.includes(payload)) {
    return stateLabels.filter((name) => name !== payload);
  } else {
    return [...state.filterByLabels, payload];
  }
};
