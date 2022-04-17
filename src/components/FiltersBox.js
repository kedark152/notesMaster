import "../styles/component/filtersBox.css";
import "../styles/utils/variable.css";
import { useFilter } from "../context/filter-context";
import { useNotes } from "../context/notes-context";

export const FiltersBox = () => {
  const { filterState, dispatchFilter } = useFilter();
  const { notesState } = useNotes();
  return (
    <>
      <div className={`filters-box-background ${filterState.setFilterBox}`}>
        <form className="filters-box-container pd-xsm mg-sm ">
          <header className="flex filters-box-heading">
            <h4>Filter and Sort Notes</h4>
            <i
              className="material-icons"
              id="filters-box-close"
              onClick={() => dispatchFilter({ type: "HIDE-FILTER-BOX" })}
            >
              close
            </i>
          </header>
          <hr />
          <div className="main-section">
            <div className="mg-y-sm sort-by-date">
              <label htmlFor="sortByDate" className="fw-bold mg-right-xsm">
                Sort By Date:
              </label>
              <select
                defaultValue=""
                name="sortByDate"
                id="sort-date"
                onChange={(e) =>
                  dispatchFilter({
                    type: "SORT-BY-DATE",
                    payload: e.target.value,
                  })
                }
              >
                <option value="" name="sortByDate" disabled>
                  --Choose an option--
                </option>
                <option value="newestFirst" name="sortByDate">
                  Newest First
                </option>
                <option value="oldestFirst" name="sortByDate">
                  Oldest First
                </option>
              </select>
            </div>
            <div className="mg-y-sm sort-by-priority">
              <label htmlFor="sortByPriority" className="fw-bold mg-right-xsm">
                Sort By Priority:
              </label>
              <select
                defaultValue=""
                name="sortByPriority"
                id="sort-priority"
                onChange={(e) =>
                  dispatchFilter({
                    type: "SORT-BY-PRIORITY",
                    payload: e.target.value,
                  })
                }
              >
                <option value="" name="sortByPriority" disabled>
                  --Choose an option--
                </option>
                <option value="HighToLow" name="sortByPriority">
                  High to Low
                </option>
                <option value="LowToHigh" name="sortByPriority">
                  Low to High
                </option>
              </select>
            </div>
            <p className="fw-bold mg-y-xsm">Filter By Priority</p>
            <div className="filter-by-priority flex">
              <label
                className="align-center"
                onClick={(e) =>
                  dispatchFilter({
                    type: "FILTER-BY-PRIORITY",
                    payload: e.target.value,
                  })
                }
              >
                <input type="checkbox" value="high" />
                High
              </label>
              <label
                className="align-center"
                onClick={(e) =>
                  dispatchFilter({
                    type: "FILTER-BY-PRIORITY",
                    payload: e.target.value,
                  })
                }
              >
                <input type="checkbox" value="medium" />
                Medium
              </label>
              <label
                className="align-center"
                onClick={(e) =>
                  dispatchFilter({
                    type: "FILTER-BY-PRIORITY",
                    payload: e.target.value,
                  })
                }
              >
                <input type="checkbox" value="low" />
                Low
              </label>
              <label
                className="align-center"
                onClick={(e) =>
                  dispatchFilter({
                    type: "FILTER-BY-PRIORITY",
                    payload: e.target.value,
                  })
                }
              >
                <input type="checkbox" value="none" />
                None
              </label>
            </div>

            {notesState.allLabels.length > 0 && (
              <div className="filter-by-labels flex-column">
                <p className="fw-bold mg-y-xsm">Filter By Labels</p>
                {notesState.allLabels.map((label) => (
                  <label
                    key={label}
                    className="align-center"
                    onClick={(e) =>
                      dispatchFilter({
                        type: "FILTER-BY-LABELS",
                        payload: e.target.value,
                      })
                    }
                  >
                    <input type="checkbox" value={label} />
                    {label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
