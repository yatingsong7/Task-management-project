import { Typography } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { IBody } from "./interfaces/IBody";
import PropTypes from "prop-types";

const TaskBody: FC<IBody> = (props): ReactElement => {
  const { taskBody = "" } = props;
  return (
    <Typography mb={1} fontSize={18}>
      {taskBody}
    </Typography>
  );
};

export default TaskBody;

TaskBody.propTypes = {
  taskBody: PropTypes.string.isRequired,
};
