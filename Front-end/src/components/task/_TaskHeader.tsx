import { Box, Typography, Chip } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { IHeader } from "./interfaces/IHeader";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { PRIORITY } from "../form/enums/PRIORITY";

const TaskHeader: FC<IHeader> = (props): ReactElement => {
  const { title = "", date = new Date(), priority = PRIORITY.low } = props;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
      <Typography fontWeight={700} fontSize={22}>
        {title}
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography fontSize={15} fontWeight={700} mr={2} color={findColorForPriority(priority)}>
          {priority.toUpperCase()}
        </Typography>
        <Chip label={format(date, "dd MMM yyyy")} variant="outlined" />
      </Box>
    </Box>
  );
};

export default TaskHeader;

TaskHeader.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
};

const findColorForPriority = (priority: PRIORITY) => {
  switch (priority) {
    case PRIORITY.low:
      return "#9DC08B";
    case PRIORITY.medium:
      return "#FDD36A";
    case PRIORITY.high:
      return "#DF2E38";
    default:
      return "#fff";
  }
};
