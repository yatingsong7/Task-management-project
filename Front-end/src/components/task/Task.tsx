import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { FC, ReactElement, useContext } from "react";
import { ViewTaskContext } from "../../context/ViewTaskContext";
import { PRIORITY } from "../form/enums/PRIORITY";
import { STATUS } from "../form/enums/STATUS";
import TaskBody from "./_TaskBody";
import TaskFooter from "./_TaskFooter";
import TaskHeader from "./_TaskHeader";
import { ITask } from "./interfaces/ITask";

const Task: FC<ITask> = (props): ReactElement => {
  const editTaskContext = useContext(ViewTaskContext);
  const {
    id = 0,
    title = "Please set up a task",
    taskBody = "Please set up a task on the right panel",
    inProgress = false,
    date = new Date(),
    priority = PRIORITY.low,
    status = STATUS.todo,
    handleMark,
    handleSwitch,
    handleDelete,
    handleManageTask = () => {},
    handleOpenEditPanel = () => {},
  } = props;
  return (
    <Box
      border={"2px solid"}
      borderRadius="5px"
      p={2}
      m={4}
      sx={{
        borderColor: "#F2CD5C",
        cursor: "pointer",
        backgroundColor: id === editTaskContext.task.id ? "#624F82" : null,
      }}
      onClick={() => handleManageTask(id)}
    >
      <TaskHeader title={title} date={date} priority={priority} />
      <TaskBody taskBody={taskBody} />
      <TaskFooter
        inProgress={inProgress}
        complete={status === STATUS.completed ? true : false}
        handleSwitch={handleSwitch}
        handleMark={handleMark}
        handleDelete={handleDelete}
        handleOpenEditPanel={handleOpenEditPanel}
        id={id}
      />
    </Box>
  );
};

export default Task;

Task.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
  inProgress: PropTypes.bool,
  taskBody: PropTypes.string.isRequired,
  priority: PropTypes.oneOf(Object.values(PRIORITY) as PRIORITY[]),
  handleMark: PropTypes.func,
  handleSwitch: PropTypes.func,
  handleDelete: PropTypes.func,
};
