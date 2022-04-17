/* eslint-disable react/prop-types */
import { useContext, createContext, useReducer } from "react";
import { filterReducer, filterInitialState } from "../reducer/filterReducer";

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({ children }) => {
  const [filterState, dispatchFilter] = useReducer(
    filterReducer,
    filterInitialState
  );

  return (
    <FilterContext.Provider value={{ filterState, dispatchFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
