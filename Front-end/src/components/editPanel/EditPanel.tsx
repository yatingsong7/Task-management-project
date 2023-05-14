import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import { EditTaskContext } from "../../context/EditTaskContext";
import { Box, Typography } from "@mui/material";

const EditPanel: FC = (): ReactElement => {
  const editTaskContext = useContext(EditTaskContext);
  console.log(editTaskContext.task.date);
  return (
    <Box marginTop={3}>
      <Typography fontWeight={700} fontSize={30}>
        {editTaskContext.task.title}
      </Typography>
      <Typography>Description: {editTaskContext.task.description}</Typography>
      {/* <Typography>{editTaskContext.task.date.getTime()}</Typography> */}
      <Typography>Satus: {editTaskContext.task.status}</Typography>
      <Typography>Priority: {editTaskContext.task.priority}</Typography>
    </Box>
  );
};

export default EditPanel;
