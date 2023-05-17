import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import PropTypes from "prop-types";
import { FC, ReactElement } from "react";
import { IFooter } from "./interfaces/IFooter";

const TaskFooter: FC<IFooter> = (props): ReactElement => {
  const {
    inProgress = false,
    complete = false,
    handleSwitch = () => console.log(),
    handleMark = () => console.log(),
    handleDelete = () => console.log(),
    handleManageTask = () => console.log(),
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
            checked={inProgress}
          />
        }
        label="In progress"
      />
      <Box display="flex" alignItems="center">
        <EditIcon
          sx={{ marginRight: "15px", cursor: "pointer" }}
          onClick={() => {
            handleManageTask(id);
          }}
        />
        <DeleteForeverIcon
          sx={{ marginRight: "15px", cursor: "pointer" }}
          onClick={() => {
            handleDelete(id);
          }}
        />
        {!complete && (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleMark(id);
            }}
          >
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
