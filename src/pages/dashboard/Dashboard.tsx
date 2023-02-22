import React, { FC, ReactElement } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";

const Dashboard: FC = (): ReactElement => {
  return (
    <Grid2 container p={2} columnSpacing={2} height={"96vh"} width={"100vw"}>
      <Grid2 xs={12} md={7}>
        <div>content</div>
      </Grid2>
      <Grid2 xs={12} md={5}>
        <div>form</div>
      </Grid2>
    </Grid2>
  );
};

export default Dashboard;
