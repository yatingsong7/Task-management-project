import { Box } from "@mui/material";
import React, { FC, ReactElement } from "react";
import TaskBody from "./_TaskBody";
import TaskFooter from "./_TaskFooter";
import TaskHeader from "./_TaskHeader";
import { ITask } from "./interfaces/ITask";
import { PRIORITY } from "../form/enums/PRIORITY";
import PropTypes from "prop-types";
import { STATUS } from "../form/enums/STATUS";

const Task: FC<ITask> = (props): ReactElement => {
  const {
    id = 0,
    title = "Please set up a task",
    taskBody = "Please set up a task on the right panel",
    inProgress = false,
    date = new Date(),
    priority = PRIORITY.low,
    status = STATUS.todo,
  } = props;
  return (
    <Box border={"2px solid"} borderRadius="5px" p={2} m={4} sx={{ borderColor: findColorForStatus(status) }}>
      <TaskHeader title={title} date={date} priority={priority} />
      <TaskBody taskBody={taskBody} />
      <TaskFooter inProgress={inProgress} />
    </Box>
  );
};

export default Task;

Task.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
  inProgress: PropTypes.bool,
  taskBody: PropTypes.string.isRequired,
  priority: PropTypes.oneOf(Object.values(PRIORITY) as PRIORITY[]),
};

const findColorForStatus = (status: STATUS) => {
  switch (status) {
    case STATUS.completed:
      return "#539165";
    case STATUS.inProgress:
      return "#F2CD5C";
    case STATUS.todo:
      return "#DF2E38";
    default:
      return "#fff";
  }
};
