import { Box } from "@mui/material";
import React, { FC, ReactElement } from "react";
import TaskBody from "./_TaskBody";
import TaskFooter from "./_TaskFooter";
import TaskHeader from "./_TaskHeader";

const Task: FC = (): ReactElement => {
  return (
    <Box border={"2px solid"} borderRadius="5px" p={2} m={4} sx={{ borderColor: "text.secondary" }}>
      <TaskHeader title="title" />
      <TaskBody taskBody="body" />
      <TaskFooter />
    </Box>
  );
};

export default Task;
