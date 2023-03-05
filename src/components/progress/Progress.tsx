import { Box } from "@mui/material";
import React, { FC, ReactElement } from "react";
import Indicator from "./Indicator";
import { INDICATOR_COLOR } from "./interfaces/IIndicator";

const Progress: FC = (): ReactElement => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Indicator color={INDICATOR_COLOR.error} label={"To Do"} count={0} />
      <Indicator color={INDICATOR_COLOR.primary} label={"In Progress"} count={0} />
      <Indicator color={INDICATOR_COLOR.success} label={"Completed"} count={0} />
    </Box>
  );
};

export default Progress;
