import Grid2 from "@mui/material/Unstable_Grid2";
import React, { FC, ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import Progress from "../progress/Progress";

const TasksArea: FC = (): ReactElement => {
  return (
    <Grid2 xs={12} md={7}>
      <Box>
        <h2>Status Of Tasks As On {format(new Date(), "PPPP")}</h2>
      </Box>
      <Progress />
    </Grid2>
  );
};

export default TasksArea;
