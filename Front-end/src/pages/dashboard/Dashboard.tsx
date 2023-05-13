import { FC, ReactElement } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import SidePanel from "../../components/sidePanel/SidePanel";
import TasksArea from "../../components/tasksArea/TasksArea";

const Dashboard: FC = (): ReactElement => {
  return (
    <>
      <Grid2 container p={2} columnSpacing={2} height={"96vh"} width={"98vw"}>
        <TasksArea />
        <SidePanel />
      </Grid2>
    </>
  );
};

export default Dashboard;
