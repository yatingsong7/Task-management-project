import { Box, FormControlLabel, Switch, Button } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { IFooter } from "./interfaces/IFooter";
import PropTypes from "prop-types";

const TaskFooter: FC<IFooter> = (props): ReactElement => {
  const { inProgress = false } = props;
  return (
    <Box display="flex" justifyContent="space-between">
      <FormControlLabel
        control={
          <Switch
            sx={{ "& .MuiSwitch-track": { backgroundColor: "text.primary" } }}
            color="primary"
            onChange={(e) => console.log(e.target.checked)}
            defaultChecked={inProgress}
          />
        }
        label="In progress"
      />
      <Button variant="contained" color="success">
        Mark Complete
      </Button>
    </Box>
  );
};

export default TaskFooter;

TaskFooter.propTypes = {
  inProgress: PropTypes.bool,
};
