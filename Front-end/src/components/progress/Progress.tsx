import { Box } from "@mui/material";
import React, { FC, ReactElement } from "react";
import Indicator from "./_Indicator";
import { INDICATOR_COLOR } from "./interfaces/IIndicator";
import { IProgress } from "./interfaces/IProgress";
import PropTypes from "prop-types";

const Progress: FC<IProgress> = (props): ReactElement => {
  const { todoCount = 0, inProgressCount = 0, completeCount = 0, handleFilter = () => console.log() } = props;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={6.6}>
      <Indicator color={INDICATOR_COLOR.error} label={"To Do"} count={todoCount} handleFilter={handleFilter} />
      <Indicator color={INDICATOR_COLOR.primary} label={"In Progress"} count={inProgressCount} handleFilter={handleFilter} />
      <Indicator color={INDICATOR_COLOR.success} label={"Completed"} count={completeCount} handleFilter={handleFilter} />
    </Box>
  );
};

export default Progress;

Progress.propTypes = {
  todoCount: PropTypes.number,
  inProgressCount: PropTypes.number,
  completeCount: PropTypes.number,
  handleFilter: PropTypes.func,
};
