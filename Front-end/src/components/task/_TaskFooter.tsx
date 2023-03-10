import { Box, FormControlLabel, Switch, Button } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { IFooter } from "./interfaces/IFooter";
import PropTypes from "prop-types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const TaskFooter: FC<IFooter> = (props): ReactElement => {
  const {
    inProgress = false,
    complete = false,
    handleSwitch = (e) => console.log(e),
    handleMark = (e) => console.log(e),
    id,
  } = props;
  return (
    <Box display="flex" justifyContent="space-between">
      <FormControlLabel
        control={
          <Switch
            sx={{ "& .MuiSwitch-track": { backgroundColor: "text.primary" } }}
            color="primary"
            onChange={(e) => {
              handleSwitch(e, id);
            }}
            defaultChecked={inProgress}
            checked={inProgress}
          />
        }
        label="In progress"
      />
      <Box display="flex" alignItems="center">
        <DeleteForeverIcon sx={{ marginRight: "15px" }} />
        {!complete && (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleMark(id);
            }}>
            Mark Complete
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TaskFooter;

TaskFooter.propTypes = {
  inProgress: PropTypes.bool,
  complete: PropTypes.bool,
  handleMark: PropTypes.func,
  handleSwitch: PropTypes.func,
};
