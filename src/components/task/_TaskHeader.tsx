import { Box, Typography } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { IHeader } from "./interfaces/IHeader";
import PropTypes from "prop-types";

const TaskHeader: FC<IHeader> = (props): ReactElement => {
  const { title = "" } = props;
  return (
    <Box display="flex" justifyContent="space-between" mb={1}>
      <Typography fontWeight={700} fontSize={22}>
        {title}
      </Typography>
      <Typography>date</Typography>
    </Box>
  );
};

export default TaskHeader;

TaskHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
