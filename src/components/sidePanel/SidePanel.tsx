import React, { FC, ReactElement } from "react";
import Profile from "../profile/Profile";
import CreateTaskForm from "../form/CreateTaskForm";
import Grid2 from "@mui/material/Unstable_Grid2";

const SidePanel: FC = (): ReactElement => {
  return (
    <Grid2
      xs={12}
      md={5}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Profile name="Bella Song" email="yatingsong7@gmail.com" />
      <CreateTaskForm />
    </Grid2>
  );
};

export default SidePanel;
