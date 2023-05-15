import React, { FC, ReactElement, useState } from "react";

import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import { STATUS } from "../form/enums/STATUS";
import SelectorInput from "../form/_SelectorInput";
import { PRIORITY } from "../form/enums/PRIORITY";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IFilterGroup, ITaskApi } from "./interfaces/ITaskApi";

const FilterGroup: FC<IFilterGroup> = (props: any): ReactElement => {
  const { filterResults = undefined, data = [], setFilterResults = () => {} } = props;
  const [showFilter, setShowFilter] = useState<Boolean>(false);
  const [filterByPriority, setFilterByPriority] = useState<PRIORITY | "">("");
  const [filterByDue, setFilterByDue] = useState<string>("");
  const [filterByStatus, setFilterByStatus] = useState<STATUS | "">("");

  const handleFilter = () => {
    let filterData = data;
    if (filterByStatus)
      filterData = filterData && filterData.filter((d: ITaskApi) => d.status.toLowerCase() === filterByStatus.toLowerCase());

    if (filterByPriority)
      filterData =
        filterData && filterData.filter((d: ITaskApi) => d.priority.toLowerCase() === filterByPriority.toLowerCase());

    if (filterByDue) {
      if (filterByDue === "Not due") {
        filterData = filterData && filterData.filter((d: ITaskApi) => !d.date || new Date(d.date) > new Date());
      } else if (filterByDue === "Due today") {
        filterData = filterData && filterData.filter((d: ITaskApi) => new Date(d.date) === new Date());
      } else if (filterByDue === "Overdue") {
        filterData = filterData && filterData.filter((d: ITaskApi) => new Date(d.date) < new Date());
      }
    }

    setFilterResults(filterData);
  };

  return (
    <>
      <Box marginX={4} display="flex" flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: "16px", fontWeight: "bold" }}
          onClick={() => {
            setShowFilter(!showFilter);
            setFilterByDue("");
            setFilterByPriority("");
            setFilterByStatus("");
          }}
        >
          Filter by
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setFilterResults(undefined);
          }}
          disabled={!filterResults}
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        >
          SHOW ALL
        </Button>
      </Box>
      {showFilter && (
        <Box marginX={4} marginTop={2} display="flex" flexDirection={"row"}>
          <Box width="30%" mr={2}>
            <SelectorInput
              label="Filter by status"
              labelId="filter-status"
              id="filter-status"
              value={filterByStatus}
              options={[
                { label: "None", value: "" },
                { label: STATUS.todo.toUpperCase(), value: STATUS.todo },
                { label: STATUS.inprogress.toUpperCase(), value: STATUS.inprogress },
                { label: STATUS.completed.toUpperCase(), value: STATUS.completed },
              ]}
              onChange={(e) => setFilterByStatus(e.target.value as STATUS)}
            />
          </Box>
          <Box width="30%" mr={2}>
            <SelectorInput
              label="Filter by priority"
              labelId="filter-priority"
              id="filter-priority"
              value={filterByPriority}
              options={[
                { label: "None", value: "" },
                { label: PRIORITY.low.toUpperCase(), value: PRIORITY.low },
                { label: PRIORITY.medium.toUpperCase(), value: PRIORITY.medium },
                { label: PRIORITY.high.toUpperCase(), value: PRIORITY.high },
              ]}
              onChange={(e) => setFilterByPriority(e.target.value as PRIORITY)}
            />
          </Box>
          <Box width="30%" mr={1}>
            <SelectorInput
              label="Filter by due"
              labelId="filter-due"
              id="filter-due"
              value={filterByDue}
              options={[
                { label: "None", value: "" },
                { label: "NOT DUE", value: "Not due" },
                { label: "DUE TODAY", value: "Due today" },
                { label: "OVERDUE", value: "Overdue" },
              ]}
              onChange={(e) => setFilterByDue(e.target.value)}
            />
          </Box>
          <Button color="primary" onClick={handleFilter}>
            <FilterAltIcon fontSize="large" />
          </Button>
        </Box>
      )}
    </>
  );
};

export default FilterGroup;

FilterGroup.propTypes = {
  filterResults: PropTypes.array,
  data: PropTypes.array,
  setFilterResults: PropTypes.func,
};
