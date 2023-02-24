import React, { FC, ReactElement } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import Profile from "../../components/profile/Profile";

const Dashboard: FC = (): ReactElement => {
  return (
    <Grid2 container p={2} columnSpacing={2} height={"98vh"} width={"100vw"}>
      <Grid2 xs={12} md={7}>
        <div>content</div>
      </Grid2>
      <Grid2
        xs={12}
        md={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Profile />
      </Grid2>
    </Grid2>
  );
};

export default Dashboard;
