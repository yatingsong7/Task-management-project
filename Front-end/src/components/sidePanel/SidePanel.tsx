import React, { FC, ReactElement, useContext, useEffect } from "react";
import Profile from "../profile/Profile";
import CreateTaskForm from "../form/CreateTaskForm";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { EditTaskContext } from "../../context/EditTaskContext";

type Anchor = "top" | "right";

const SidePanel: FC = (): ReactElement => {
  const editTaskContext = useContext(EditTaskContext);
  const [state, setState] = React.useState({
    top: editTaskContext.isOpen,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    if (anchor === "top") editTaskContext.toggleIsOpen();
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    setState({ ...state, top: editTaskContext.isOpen });
  }, [editTaskContext.isOpen]);

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
      {(["right", "top"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} variant="contained" sx={{ marginTop: "15px" }}>
            {anchor === "right" && "Create a Task"}
            {anchor === "top" && "Task Review"}
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            PaperProps={{
              sx: { width: anchor === "right" ? "50%" : "100%", height: anchor === "top" ? "90%" : "100%" },
            }}
          >
            <Box marginX={5} marginY="auto">
              {anchor === "right" && <CreateTaskForm />}
              {anchor === "top" && <></>}
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </Grid2>
  );
};

export default SidePanel;
