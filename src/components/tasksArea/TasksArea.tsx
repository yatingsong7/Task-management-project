import Grid2 from "@mui/material/Unstable_Grid2";
import React, { FC, ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import Progress from "../progress/Progress";
import Task from "../task/Task";

const TasksArea: FC = (): ReactElement => {
  return (
    <Grid2 xs={12} md={7}>
      <Box>
        <h2 style={{ marginBottom: "30px" }}>Status Of Tasks As On {format(new Date(), "PPPP")}</h2>
        <Progress />
        <Task />
      </Box>
    </Grid2>
  );
};

export default TasksArea;
