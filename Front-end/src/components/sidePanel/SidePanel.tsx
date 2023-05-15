import React, { FC, ReactElement, useContext, useEffect } from "react";
import Profile from "../profile/Profile";
import CreateTaskForm from "../form/CreateTaskForm";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ViewTaskContext } from "../../context/ViewTaskContext";
import EditPanel from "../editPanel/EditPanel";
import CompareTaskPanel from "../compareTasksPanel/CompareTaskPanel";

type Anchor = "top" | "right" | "bottom" | "left";

const SidePanel: FC = (): ReactElement => {
  const viewTaskContext = useContext(ViewTaskContext);
  const [state, setState] = React.useState({
    top: false,
    right: false,
    bottom: false,
    left: viewTaskContext.isOpen,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    if (anchor === "left") viewTaskContext.toggleIsOpen();
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    setState({ ...state, left: viewTaskContext.isOpen });
  }, [viewTaskContext.isOpen]);

  return (
    <Grid2
      xs={12}
      md={2}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Profile name="Bella Song" email="email@email.com" />
      {(["right", "top", "bottom", "left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          {anchor !== "left" && (
            <Button onClick={toggleDrawer(anchor, true)} variant="contained" sx={{ marginTop: "15px" }}>
              {anchor === "right" && "Create a Task"}
              {anchor === "bottom" && "bottom"}
              {anchor === "top" && "top"}
            </Button>
          )}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            PaperProps={{
              sx: {
                width:
                  anchor !== "right" && anchor !== "left"
                    ? "100%"
                    : anchor === "right"
                    ? "50%"
                    : anchor === "left"
                    ? "80%"
                    : "100%",
                height: anchor === "top" || anchor === "bottom" ? "90%" : "100%",
              },
            }}
          >
            <Box marginX={5}>
              {anchor === "right" && <CreateTaskForm />}
              {anchor === "top" && <></>}
              {anchor === "left" && <EditPanel />}
              {anchor === "bottom" && <CompareTaskPanel />}
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </Grid2>
  );
};

export default SidePanel;
